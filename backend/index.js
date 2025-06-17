import e from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import cartRouter from "./routes/cart.routes.js";
// import multer from "multer";
dotenv.config()

const PORT = process.env.PORT
const app = e()
// const upload = multer({ dest: '/backend/upload'})

app.use(e.json())
app.use(cors())

app.use('/store', productRoutes)
app.use('/store', userRouter)
app.use('/store', authRouter)
app.use('/store', cartRouter)

app.listen(PORT, () => console.log(`Server running on PORT http://localhost:${PORT}`))