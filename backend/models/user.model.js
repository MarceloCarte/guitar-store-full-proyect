import { pool } from "../db/db.js";

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";

  try {
    const { rows: user } = await pool.query(query, [email]);
    return user[0];
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createUser = async (email, hashedPassword, name, image) => {
  const query =
    "INSERT INTO users (name, email, password, image_url) VALUES ($1, $2, $3, $4) RETURNING *";

  try {
    const res = await pool.query(query, [email, hashedPassword, name, image]);
    return res.rows[0];
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};