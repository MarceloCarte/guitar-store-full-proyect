import {
  createProduct,
  deleteProductById,
  findProductById,
  getAllProducts,
  updateProduct,
} from "../models/product.model.js";
import { prepHateoas, validateProduct } from "../utils/productUtils.js";


export const getProducts = async (req, res) => {
  try {
    const productos = await getAllProducts();
    if (!productos) res.status(401).json({ message: "No existen productos." });
    const productosH = prepHateoas(productos);
    res.status(200).json(productosH);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await findProductById(id);

    if (!producto)
      return res.status(404).json({ message: "Producto no existe." });

    return res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await findProductById(id);
    const result = await deleteProductById(id);

    if (product?.image_url?.startsWith("/uploads")) {
      const imagePath = path.join(process.cwd(), "public", product.image_url);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn("No se pudo eliminar la imagen:", err.message);
      });
    }

    res.status(204).json({ message: "Producto eliminado con éxito.", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
};

export const editProduct = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const data = {
    ...req.body,
    user_id: req.user.id,
    price_clp: Number(req.body.price_clp),
    stock: Number(req.body.stock),
    image_url: req.file
      ? `${baseUrl}/uploads/${req.file.filename}`
      : req.body.image?.startsWith("http")
      ? req.body.image
      : null,
  };
  const { id } = req.params;
  const errors = validateProduct(data);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const product = await updateProduct(data, id);
    return res.status(200).json({
      message: "Producto editado con éxito.",
      product: {
        id: product.id,
        name: product.name,
        price_clp: product.price_clp,
        stock: product.stock,
        type: product.type,
        condition: product.condition,
        description: product.description,
        image_url: product.image_url,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar producto" });
  }
};

export const newProduct = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  
  const data = {
    ...req.body,
    user_id: req.user.id,
    price_clp: Number(req.body.price_clp),
    stock: Number(req.body.stock),
    image_url: req.file
      ? `${baseUrl}/uploads/${req.file.filename}`
      : req.body.image?.startsWith("http")
      ? req.body.image
      : null,
  };

  const errors = validateProduct(data);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const product = await createProduct(data);

    return res.status(200).json({
      message: "Producto creado con éxito",
      product: {
        id: product.id,
        name: product.name,
        price_clp: product.price_clp,
        stock: product.stock,
        type: product.type,
        condition: product.condition,
        description: product.description,
        image_url: product.image_url,
        user_id: product.user_id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el producto." });
  }
};
