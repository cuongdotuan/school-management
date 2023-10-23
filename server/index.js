import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import router from "./routers/index.js"

dotenv.config()

const PORT = 8888
const { MONGODB_URL } = process.env

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL)
    console.log("Connect to database successfully!")
  } catch (error) {
    console.log("Connect to database failed!")
    console.log(error)
  }
}
connectToDatabase()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("/")
})

app.use("/api", router)

app.listen(PORT, () => {
  console.log(`Server: http://127.0.0.1:${PORT}`)
})
