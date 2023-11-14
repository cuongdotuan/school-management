import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_KEY } = process.env

const TOKEN_EXPIRE_IN_SECONDS = 60 * 60

const login = (username, password) => {
  if (
    username &&
    username === ADMIN_USERNAME &&
    password &&
    password === ADMIN_PASSWORD
  ) {
    const user = {
      username,
    }
    const token = jwt.sign(user, JWT_KEY, {
      expiresIn: TOKEN_EXPIRE_IN_SECONDS,
    })
    return { user, token }
  }
  throw new Error("Invalid request")
}

const authService = { login }

export default authService
