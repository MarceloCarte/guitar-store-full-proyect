import { pool } from "../db/db.js";

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";

  try {
    const { rows: user } = await pool.query(query, [email]);
    return user[0];
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const createUser = async ({id, email, password, name, image}) => {
  const query =
    "INSERT INTO users (id, email, password, name, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *";

  try {
    const res = await pool.query(query, [id, email, password, name, image]);
    return res.rows[0];
  } catch (error) {
    throw error
  }
};