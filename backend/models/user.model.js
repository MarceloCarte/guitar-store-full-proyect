import { pool } from "../db/db.js";

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";

  try {
    const { rows: user } = await pool.query(query, [email]);
    return user[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async ({
  id,
  email,
  password,
  name,
  image,
  type,
}) => {
  const query =
    "INSERT INTO users (id, email, password, name, image_url, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

  try {
    const res = await pool.query(query, [
      id,
      email,
      password,
      name,
      image,
      type,
    ]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

export const updateUser = async ({ id, password, name, image }) => {
  const query = `
    UPDATE users
    SET password = $1,
        name = $2,
        image_url = $3
    WHERE id = $4
    RETURNING *
  `;

  const values = [password, name, image, id];

  try {
    const { rows: updatedUser } = await pool.query(query, values);
    return updatedUser[0];
  } catch (error) {
    console.error("Error en updateUser:", error);
    throw error;
  }
};
