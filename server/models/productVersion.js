import { DEFAULT_VERSION } from "../constants.js"
import mongoose from "mongoose"
const { Schema } = mongoose

const ProductVersionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    required: true,
  },
  thumbnail: String,
  images: [String],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  version: {
    type: Number,
    required: true,
    default: DEFAULT_VERSION,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
})

const ProductVersion = mongoose.model("ProductVersion", ProductVersionSchema)

export default ProductVersion
