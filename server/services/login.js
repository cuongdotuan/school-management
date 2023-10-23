import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const { PASSWORD_SALT_ROUNDS, ADMIN_USERNAME, ADMIN_PASSWORD, JWT_KEY } =
  process.env

const TOKEN_EXPIRE_IN_SECONDS = 3600

const saltRounds = PASSWORD_SALT_ROUNDS || 10

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
