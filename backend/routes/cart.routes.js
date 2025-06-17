import { Router } from "express";

const cartRouter = Router()

//Add product
cartRouter.post('/cart', (req, res) => res.send('Add product'))

//Get whole cart
cartRouter.get('/cart', (req, res) => res.send('Get whole cart'))

//

export default cartRouter