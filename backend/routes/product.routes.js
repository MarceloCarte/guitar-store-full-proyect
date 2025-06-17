import { Router } from "express";

const productRoutes = Router()

productRoutes.get('/products', (req, res) => res.send('GET all products'))
productRoutes.get('/products/item/:id', (req, res) => res.send('GET single product'))

productRoutes.post('/products', (req, res) => res.send('POST product'))

productRoutes.delete('/products/item/:id', (req, res) => res.send('DELET product'))

productRoutes.put('/products/item/:id', (req, res) => res.send('UPDATE product'))

export default productRoutes