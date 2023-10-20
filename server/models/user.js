import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  middleName: String,
  gender: Boolean,
  birthday: Date,
  email: String,
  phone: String,
  ward: Number,
  district: Number,
  province: Number,
})

const User = mongoose.model("User", userSchema)

export default User
