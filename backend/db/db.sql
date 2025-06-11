CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price_clp INTEGER NOT NULL CHECK (price_clp >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    type TEXT NOT NULL CHECK (type IN ('electrica', 'nylon', 'acústica', 'electroacústica')),
    condition TEXT NOT NULL CHECK (condition IN ('nueva', 'usada')),
	description VARCHAR(500) NOT NULL,
    image_url TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
	image_url TEXT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    item_price_clp INTEGER NOT NULL CHECK (item_price_clp >= 0)
);

CREATE TABLE user_products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description VARCHAR(500) NOT NULL,
    price_clp INTEGER NOT NULL CHECK (price_clp >= 0),
    type TEXT NOT NULL CHECK (type IN ('electrica', 'nylon', 'acústica', 'electroacústica')),
    condition TEXT NOT NULL CHECK (condition IN ('nueva', 'usada')),
    image_url TEXT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_sold BOOLEAN DEFAULT FALSE
);