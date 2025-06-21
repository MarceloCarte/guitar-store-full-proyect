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
  const { user_id, name, price_clp, stock, type, condition, description, image_url } =
    data;
  const values = [
    user_id,
    name,
    price_clp,
    stock,
    type,
    condition,
    description,
    image_url,
  ];
  const query =
    "INSERT INTO products (id, user_id, name, price_clp, stock, type, condition, description, image_url) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error interno del servidor", error);
  }
};

export const deleteProductById = async (id) => {
  const selectImage = "SELECT image_url FROM products WHERE id = $1";
  const deleteQuery = "DELETE FROM products WHERE id = $1 RETURNING *";

  try {
    const { rows: imageRows } = await pool.query(selectImage, [id]);
    const imagePath = imageRows[0]?.image_url;

    const { rows: deletedRows } = await pool.query(deleteQuery, [id]);

    if (imagePath && imagePath.startsWith("/uploads")) {
      const fullImagePath = path.join(process.cwd(), "public", imagePath);
      fs.unlink(fullImagePath, (err) => {
        if (err) {
          console.warn("No se pudo eliminar la imagen:", err.message);
        } else {
          console.log("Imagen eliminada correctamente:", imagePath);
        }
      });
    }

    return deletedRows[0];
  } catch (error) {
    console.error("Error interno del servidor", error);
  }
};

export const updateProduct = async (data, id) => {
  const { name, price_clp, stock, type, condition, description, image_url } =
    data;
  const values = [
    name,
    price_clp,
    stock,
    type,
    condition,
    description,
    image_url,
    id,
  ];
  const query =
    "UPDATE products SET name = $1, price_clp = $2, stock = $3, type = $4, condition = $5, description = $6, image_url = $7 WHERE id = $8 RETURNING *";

  try {
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {throw new Error('Producto no encontrado.')}
    return rows[0];
  } catch (error) {
    console.error("Error interno del servidor", error);
  }
};
