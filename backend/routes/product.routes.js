import { Router } from "express";
import {
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
  newProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const productRoutes = Router();

productRoutes.get("/products", getProducts);
productRoutes.get("/products/item/:id", getProduct);

productRoutes.post(
  "/products",
  verifyToken,
  upload.single("image"),
  newProduct
);

productRoutes.delete("/products/item/:id", verifyToken, deleteProduct);

productRoutes.put(
  "/products/item/:id",
  verifyToken,
  upload.single("image"),
  editProduct
);

export default productRoutes;
