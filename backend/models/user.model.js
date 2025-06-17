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

export const createUser = async (validEmail, name, hashedPassword, image) => {
  const query =
    "INSERT INTO users (name, email, password, image_url) VALUES ($1, $2, $3, $4) RETURNING *";

  try {
    const res = await pool.query(query, [validEmail, name, hashedPassword, image]);
    return res.rows[0];
  } catch (error) {
    throw error
  }
};