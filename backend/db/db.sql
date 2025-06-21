CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price_clp INTEGER NOT NULL CHECK (price_clp >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    type TEXT NOT NULL CHECK (type IN ('electrica', 'nylon', 'acustica', 'electroacustica')),
    condition TEXT NOT NULL CHECK (condition IN ('nueva', 'usada')),
	description TEXT NOT NULL,
    image_url TEXT
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL;
);

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('admin', 'usuario'))
	image_url TEXT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    item_price_clp INTEGER NOT NULL CHECK (item_price_clp >= 0)
);


SELECT * FROM USERS;

SELECT * FROM products;

INSERT INTO products (name, price_clp, stock, type, condition, description, image_url)
VALUES 
  ('Fender Stratocaster Player', 650000, 999, 'electrica', 'nueva', 'Classic Fender Strat with alder body, 3 single-coil pickups, and maple neck.', 'https://media.guitarcenter.com/is/image/MMGS7/M11487000001000-00-600x600.jpg'),
  ('Gibson Les Paul Studio', 890000, 999, 'electrica', 'nueva', 'Iconic rock guitar with humbuckers, mahogany body, and powerful tone.', 'https://media.guitarcenter.com/is/image/MMGS7/M14341000003000-00-600x600.jpg'),
  ('Yamaha C40 Classical Guitar', 120000, 999, 'nylon', 'nueva', 'Affordable classical guitar perfect for students and beginners.', 'https://media.guitarcenter.com/is/image/MMGS7/H75956000001000-00-600x600.jpg'),
  ('Cordoba C5 Nylon String Guitar', 220000, 4, 'nylon', 'nueva', 'Warm tone and solid cedar top. A step up for classical players.', 'https://media.guitarcenter.com/is/image/MMGS7/H86508000001000-00-600x600.jpg'),
  ('Taylor GS Mini Mahogany', 460000, 50, 'acustica', 'nueva', 'Compact acoustic with big tone, perfect for travel or home playing.', 'https://media.guitarcenter.com/is/image/MMGS7/L95099000001000-00-600x600.jpg'),
  ('Martin D-10E Road Series', 750000, 5, 'electroacustica', 'usada', 'Stage-ready acoustic-electric with solid wood build and built-in tuner.', 'https://media.guitarcenter.com/is/image/MMGS7/L57154000001000-00-600x600.jpg'),
  ('Epiphone Les Paul Standard', 390000, 6, 'electrica', 'usada', 'Affordable Les Paul with a fat tone and stylish sunburst finish.', 'https://media.guitarcenter.com/is/image/MMGS7/L72546000003000-00-600x600.jpg');
