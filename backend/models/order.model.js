import { pool } from "../db/db.js";

export const createOrder = async (userId) => {
  const query = "INSERT INTO orders (user_id) VALUES ($1) RETURNING *";
  const values = [userId];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const createOrderItem = async (
  orderId,
  productId,
  quantity,
  itemPrice
) => {
  const query =
    "INSERT INTO order_items (order_id, product_id, quantity, item_price_clp) VALUES ($1, $2, $3, $4) returning *";
  const values = [orderId, productId, quantity, itemPrice];
  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const decreaseProductStock = async (productId, quantity) => {
  const query =
    "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING *";
  const values = [productId, quantity];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};
