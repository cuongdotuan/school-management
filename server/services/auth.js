import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.js"
import { ROLES } from "../constants.js"
import * as argon2 from "argon2"

const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_KEY, PASSWORD_SALT_ROUNDS } =
  process.env

const saltRounds = parseInt(PASSWORD_SALT_ROUNDS)

const TOKEN_EXPIRE_IN_SECONDS = 60 * 60

const login = async (username, password) => {
  if (
    username &&
    username === ADMIN_USERNAME &&
    password &&
    password === ADMIN_PASSWORD
  ) {
    const payload = {
      username,
      fullname: username,
      role: ROLES.ADMIN,
    }
    const token = jwt.sign(payload, JWT_KEY, {
      expiresIn: TOKEN_EXPIRE_IN_SECONDS,
    })
    return { user: payload, token }
  }

  throw new Error("Invalid request")
}

const authService = { login }

export default authService
