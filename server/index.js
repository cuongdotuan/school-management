import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

import loginController from "./controllers/login.js"

const connectToDatabase = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/student-management")
    console.log("Connect to database successfully!")
  } catch (error) {
    console.log("Connect to database failed!", error)
  }
}

connectToDatabase()

const PORT = 8888

const app = express()

app.use(cors())

app.get("/", (req, res) => {
  res.send("Root")
})

app.use("/login", loginController.login)

app.listen(PORT, () => {
  console.log(`Server: http://127.0.0.1:${PORT}`)
})
