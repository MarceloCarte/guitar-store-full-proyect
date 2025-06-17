import { pool } from "../db/db.js";

export const getAllProducts = async () => {
  const query = "SELECT * FROM products";
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

export const findProductById = async (id) => {
  const query = "SELECT * FROM products WHERE id = $1";

  try {
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      throw new Error(`Producto con la ID ${id} no fue encontrado`);
    }
    return rows[0];
  } catch (error) {
    console.error("Error interno del servidor", error);
  }
};

export const createProduct = async (data) => {
  const { name, price_clp, stock, type, condition, description, image_url } =
    data;
  const values = [name, price_clp, stock, type, condition, description, image_url];
  const query =
    "INSERT INTO products (id, name, price_clp, stock, type, condition, description, image_url) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *";

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error interno del servidor", error);
  }
};
