import { Router } from "express";
import { getProduct, getProducts, newProduct } from "../controllers/product.controller.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

const productRoutes = Router()

productRoutes.get('/products', getProducts)
productRoutes.get('/products/item/:id', getProduct)

productRoutes.post('/products' /* , verifyToken */, newProduct)

productRoutes.delete('/products/item/:id', (req, res) => res.send('DELET product'))

productRoutes.put('/products/item/:id', (req, res) => res.send('UPDATE product'))

export default productRoutes