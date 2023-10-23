import loginService from "../services/login.js"

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const { token, user } = loginService.login(username, password)
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message })
  }
}

const authController = { login }

export default authController
