import e from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from "./routes/product.routes.js";
dotenv.config()

const PORT = process.env.PORT
const app = e()

app.use(e.json())
app.use(cors())

app.use('/store', productRoutes)

app.listen(PORT, () => console.log(`Server running on PORT http://localhost:${PORT}`))