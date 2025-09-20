-- database: c:\Users\hetin\Desktop\BackEnd-1-Projekt-React\server\db\product-manager.db

CREATE TABLE "products" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL NOT NULL,
    description TEXT,
    image TEXT
);

INSERT INTO products (name, price, description, image) VALUES
('T-shirt', 199.99, 'En snygg bomulls-t-shirt', 'https://via.placeholder.com/300x300'),
('Jeans', 499.50, 'Blå denimjeans', 'https://via.placeholder.com/300x300'),
('Hoodie', 299.00, 'Mysig hoodie med luva', 'https://via.placeholder.com/300x300'),
('Sneakers', 899.99, 'Bekväma sneakers', 'https://via.placeholder.com/300x300'),
('Jacka', 699.00, 'Varm jacka för vintern', 'https://via.placeholder.com/300x300'),
('Keps', 149.99, 'Stilig keps', 'https://via.placeholder.com/300x300'),
('Skjorta', 349.99, 'Klassisk skjorta', 'https://via.placeholder.com/300x300'),
('Byxor', 399.50, 'Bekväma byxor', 'https://via.placeholder.com/300x300');

ALTER TABLE products ADD COLUMN brand TEXT;
ALTER TABLE products ADD COLUMN sku TEXT;
ALTER TABLE products ADD COLUMN category TEXT;

UPDATE products SET brand = 'BasicWear', sku = 'TSH001', category = 'Kläder' WHERE name = 'T-shirt';
UPDATE products SET brand = 'DenimCo', sku = 'JNS001', category = 'Kläder' WHERE name = 'Jeans';
UPDATE products SET brand = 'CozyFit', sku = 'HD001', category = 'Kläder' WHERE name = 'Hoodie';
UPDATE products SET brand = 'StepUp', sku = 'SNK001', category = 'Skor' WHERE name = 'Sneakers';
UPDATE products SET brand = 'WinterWear', sku = 'JCK001', category = 'Kläder' WHERE name = 'Jacka';
UPDATE products SET brand = 'HeadStyle', sku = 'CAP001', category = 'Accessoarer' WHERE name = 'Keps';
UPDATE products SET brand = 'ClassicLine', sku = 'SRT001', category = 'Kläder' WHERE name = 'Skjorta';
UPDATE products SET brand = 'ComfortFit', sku = 'PNT001', category = 'Kläder' WHERE name = 'Byxor';¨



CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT
);

INSERT INTO categories (name, image) VALUES ('Kläder', '');
INSERT INTO categories (name, image) VALUES ('Accessoarer', '');
INSERT INTO categories (name, image) VALUES ('Skor', '');


CREATE TABLE product_categories (
    product_id INTEGER NOT NULL, -- referens till products.id
    category_id INTEGER NOT NULL, -- referens till categories.id
    PRIMARY KEY (product_id, category_id), -- sammansatt primärnyckel
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE, -- när en produkt tas bort, ta bort relaterade rader
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE -- när en kategori tas bort, ta bort relaterade rader
);



-- jag har raderat alla produkter efter många gånger jag testade att lägga till nya produkter
DELETE FROM product_categories;

-- Kläder
INSERT INTO product_categories (product_id, category_id) VALUES (1, 1); 
INSERT INTO product_categories (product_id, category_id) VALUES (3, 1); 
INSERT INTO product_categories (product_id, category_id) VALUES (5, 1); 
INSERT INTO product_categories (product_id, category_id) VALUES (7, 1); 
INSERT INTO product_categories (product_id, category_id) VALUES (2, 2); 
INSERT INTO product_categories (product_id, category_id) VALUES (6, 2); 
INSERT INTO product_categories (product_id, category_id) VALUES (4, 3); 
INSERT INTO product_categories (product_id, category_id) VALUES (8, 3); 
