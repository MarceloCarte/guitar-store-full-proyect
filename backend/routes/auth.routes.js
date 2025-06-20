import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";
import { processImage, upload } from "../middleware/upload.middleware.js";

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/sign-up', upload.single('image'), processImage, signUp)
authRouter.post('/logout', logout)

export default authRouter