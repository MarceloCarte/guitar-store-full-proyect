import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { checkout } from "../controllers/orders.controller.js";

const cartRouter = Router()


cartRouter.post('/checkout', verifyToken, checkout)



export default cartRouter