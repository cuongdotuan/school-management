import express from "express"
const PORT = 8888

const app = express()

app.get("/", (req, res) => {
  res.send("OK")
})

app.listen(PORT, () => {
  console.log(`Server: http://127.0.0.1:${PORT}`)
})
