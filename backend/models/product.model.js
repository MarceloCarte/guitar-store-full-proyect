import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter the product name'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Product Price required'],
            min: 0,
        },
        description: {
            type: String,
            required: [true, 'Product Description required'],
            maxLength: 2000,
        },
        category: {
            type: String,
            required: [true, 'Product Category required'],
            enum: ['electric-guitar', 'acoustic-guitar', 'strings', 'pics', 'straps', 'amplifiers', 'cables']
        }
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product