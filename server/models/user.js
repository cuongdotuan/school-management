import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  birthday: Date,
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  ward: {
    type: Number,
    required: true,
  },
  district: {
    type: Number,
    required: true,
  },
  province: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  cart: [{ type: Schema.Types.ObjectId, ref: "ProductVersion", default: [] }],
})

const User = mongoose.model("User", userSchema)

export default User
