import { Router } from "express";
import {
  getProduct,
  getProducts,
  newProduct,
} from "../controllers/product.controller.js";
import { processImage, upload } from "../middleware/upload.middleware.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

const productRoutes = Router();

productRoutes.get("/products", getProducts);
productRoutes.get("/products/item/:id", getProduct);

productRoutes.post(
  "/products" /* , verifyToken */,
  upload.single("image"),
  newProduct
);

productRoutes.delete("/products/item/:id", (req, res) =>
  res.send("DELET product")
);

productRoutes.put("/products/item/:id", (req, res) =>
  res.send("UPDATE product")
);

export default productRoutes;
