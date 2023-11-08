import { DEFAULT_VERSION, SIZES } from "../constants.js"
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
    enum: SIZES,
    required: true,
  },
  thumbnail: String,
  images: [String],
  categories: [
    { type: Schema.Types.ObjectId, ref: "Category", required: true },
  ],
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  version: {
    type: Number,
    required: true,
    default: DEFAULT_VERSION,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
})

const ProductVersion = mongoose.model("ProductVersion", ProductVersionSchema)

export default ProductVersion
