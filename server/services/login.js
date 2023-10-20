import User from "../models/user.js"
import bcrypt from "bcrypt"

const saltRounds = process.env.PASSWORD_SALT_ROUNDS || 10

const login = async (username, password) => {
  try {
    const hash = await bcrypt.hash("admin", saltRounds)
    const newUser = new User({
      username: "admin",
      password: hash,
    })
    await User.create(newUser)
    console.log("create")
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
}
