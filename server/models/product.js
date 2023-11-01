import mongoose from "mongoose"
const { Schema } = mongoose

const productSchema = new Schema({})

const Product = mongoose.model("Product", productSchema)

export default Product
