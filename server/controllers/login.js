import loginService from "../services/login.js"

const login = async (req, res) => {
  try {
    const data = await loginService.login()
    console.log(2)
    res.send("LOGIN")
  } catch (error) {}
}

export default {
  login,
}
