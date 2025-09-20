const express = require("express"); // Express framework
const cors = require("cors"); 
const Database = require("better-sqlite3");   
const multer = require("multer"); // För filuppladdning
const path = require("path"); // hjälper med filvägar 

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use('/images/products', express.static(path.join(__dirname, '../../client/public/images/products')));  // Gör bilder i denna mapp tillgängliga via URL
app.use('/images/categories', express.static(path.join(__dirname, '../../client/public/images/categories')));  


const db = new Database("./db/product-manager.db", { verbose: console.log });



app.get("/api/categories", (req, res) => {
  try {
    const categories = db.prepare("SELECT id, name FROM categories").all();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});


app.get("/api/categories/:name", (req, res) => { // Hämta produkter för en specifik kategori 
  try {
    const categoryName = req.params.name.toLowerCase();
    const products = db.prepare(`
      SELECT p.id, p.name, p.price, p.description, p.image, p.brand, p.sku
      FROM products p
      INNER JOIN product_categories pc ON p.id = pc.product_id    
      INNER JOIN categories c ON pc.category_id = c.id 
      WHERE LOWER(c.name) = ? 
    `).all(categoryName); 
    // inner join används för att kombinera rader från två eller flera tabeller baserat på en relaterad kolumn mellan dem.

    res.json(products || []);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});


app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare(`
      SELECT id, name, price, description, image, sku, brand, category
      FROM products
    `).all();
    res.json(products || []);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// Sök produkter (måste ligga före :name)
app.get("/api/products/search", (req, res) => { // Sök produkter baserat på sökterm i query-parametern 'q'
  try {
    const searchTerm = (req.query.q || "").trim().toLowerCase(); // Hämta och trimma sökterm
    if (!searchTerm) return res.json([]); // Om sökterm är tom, returnera tom array

    const products = db
      .prepare("SELECT * FROM products WHERE LOWER(name) LIKE ?")
      .all(`%${searchTerm}%`); 

    res.json(products || []); // Returnera produkter eller tom array
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json([]);
  }
});

app.get('/api/products/:name', (req, res) => {
  try {
    const { name } = req.params;
    const product = db.prepare(`
      SELECT id, name, price, description, image
      FROM products
      WHERE LOWER(name) = LOWER(?)
    `).get(name);

    res.json(product || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Liknande produkter
app.get('/api/products/:name/similar', (req, res) => {
  try {
    const products = db.prepare(`
      SELECT id, name, price, description, image
      FROM products
      WHERE name != ?
    `).all(req.params.name);

    res.json(products || []);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});


const storage = multer.diskStorage({ // Konfiguration för var och hur filer ska sparas
  destination: path.join(__dirname, "../../client/public/images/products"), //__dirname är den nuvarande katalogen.
  filename: (req, file, cb) => { // cb är en callback-funktion som anropas när filnamnet är skapat
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Raden skapar ett unikt suffix baserat på tid och ett slumpmässigt tal för att säkerställa att uppladdade filer får unika namn och inte krockar.
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Exempel: image-1632345678901-123456789.jpg. ext är filändelsen som behålls från den ursprungliga filen.
  },
});
const upload = multer({ storage }); // strong>upload är en multer-instans med den definierade lagringen

const categoryStorage = multer.diskStorage({
  destination: path.join(__dirname, "../../client/public/images/categories"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const uploadCategory = multer({ storage: categoryStorage }); //strong: categoryStorage används för kategoribilder



// Lägg till produkt
app.post("/api/products", upload.single("image"), (req, res) => { // upload.single("image") hanterar en enda fil med fält-namnet "image"
  try {
    const { name, description, brand, sku, price, categories } = req.body;
    const imageUrl = req.file ? `/images/products/${req.file.filename}` : ""; // Om en fil har laddats upp, skapa URL för bilden

    const result = db.prepare(`
      INSERT INTO products (name, description, brand, sku, price, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, description, brand, sku, price, imageUrl);

    const productId = result.lastInsertRowid; // lastInsertRowid är ID:t för den nyligen insatta raden

    if (categories) {
      const selectedCategories = JSON.parse(categories); //JSON.parse för att omvandla strängen tillbaka till en array
      selectedCategories.forEach((catId) => {
        db.prepare(`
          INSERT INTO product_categories (product_id, category_id)
          VALUES (?, ?)
        `).run(productId, catId);
      });
    }

    res.status(200).json({ message: "Produkt skapad!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Något gick fel!" });
  }
});

// Skapa kategori
app.post("/api/categories", uploadCategory.single("image"), (req, res) => { // single("image") hanterar en enda fil med fält-namnet "image"
  try {
    const { name } = req.body;
    if (!name || name.length > 25) return res.status(400).json({ error: "Namn är obligatoriskt och max 25 tecken." });

    const imageUrl = req.file ? `/images/categories/${req.file.filename}` : "";
    db.prepare(`INSERT INTO categories (name, image) VALUES (?, ?)`).run(name, imageUrl);

    res.status(200).json({ message: "Kategori skapad!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Något gick fel vid skapandet av kategori." });
  }
});


const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
