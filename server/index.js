import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"

dotenv.config()

const { MONGODB_URL } = process.env

import loginController from "./controllers/login.js"

const connectToDatabase = async () => {
  try {
    mongoose.connect(MONGODB_URL)
    console.log("Connect to database successfully!")
  } catch (error) {
    console.log("Connect to database failed!", error)
  }
}

connectToDatabase()

const PORT = 8888

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Root")
})

app.post("/login", loginController.login)

app.listen(PORT, () => {
  console.log(`Server: http://127.0.0.1:${PORT}`)
})
