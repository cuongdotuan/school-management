import mongoose from "mongoose"
const { Schema } = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  isInNavbar: {
    type: Boolean,
    default: false,
  },
  isInFilter: {
    type: Boolean,
    default: false,
  },
})

const Category = mongoose.model("Category", categorySchema)

export default Category
