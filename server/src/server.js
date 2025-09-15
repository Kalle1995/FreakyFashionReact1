const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const multer = require("multer");
const path = require("path");

// Skapa app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use('/images/products', express.static(path.join(__dirname, '../../client/public/images/products')));
app.use('/images/categories', express.static(path.join(__dirname, '../../client/public/images/categories')));

// Öppna databasen
const db = new Database("./db/product-manager.db", { verbose: console.log });

// ----------------------
// Kategorier
// ----------------------
app.get("/api/categories", (req, res) => {
  try {
    const categories = db.prepare("SELECT id, name FROM categories").all();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

app.get("/api/categories/:name", (req, res) => {
  try {
    const categoryName = req.params.name.toLowerCase();
    const products = db.prepare(`
      SELECT p.id, p.name, p.price, p.description, p.image, p.brand, p.sku
      FROM products p
      INNER JOIN product_categories pc ON p.id = pc.product_id
      INNER JOIN categories c ON pc.category_id = c.id
      WHERE LOWER(c.name) = ?
    `).all(categoryName);

    res.json(products || []);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// ----------------------
// Produkter
// ----------------------

// Alla produkter
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
app.get("/api/products/search", (req, res) => {
  try {
    const searchTerm = (req.query.q || "").trim().toLowerCase();
    if (!searchTerm) return res.json([]);

    const products = db
      .prepare("SELECT * FROM products WHERE LOWER(name) LIKE ?")
      .all(`%${searchTerm}%`);

    res.json(products || []);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json([]);
  }
});

// Produktdetalj via namn
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

// ----------------------
// Multer inställningar
// ----------------------
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../client/public/images/products"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

const categoryStorage = multer.diskStorage({
  destination: path.join(__dirname, "../../client/public/images/categories"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const uploadCategory = multer({ storage: categoryStorage });

// ----------------------
// POST endpoints
// ----------------------

// Lägg till produkt
app.post("/api/products", upload.single("image"), (req, res) => {
  try {
    const { name, description, brand, sku, price, categories } = req.body;
    const imageUrl = req.file ? `/images/products/${req.file.filename}` : "";

    const result = db.prepare(`
      INSERT INTO products (name, description, brand, sku, price, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, description, brand, sku, price, imageUrl);

    const productId = result.lastInsertRowid;

    if (categories) {
      const selectedCategories = JSON.parse(categories);
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
app.post("/api/categories", uploadCategory.single("image"), (req, res) => {
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

// ----------------------
// Starta server
// ----------------------
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
