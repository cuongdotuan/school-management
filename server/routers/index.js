import express from "express"
import authRouter from "./auth.js"
import categoryRouter from "./category.js"
import productRouter from "./product.js"
import { SIZES } from "../constants.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.get("/sizes", (req, res) => res.json(SIZES))

export default router
