import express from "express"
import { ADDRESSES, SIZES } from "../constants.js"
import authRouter from "./auth.js"
import categoryRouter from "./category.js"
import productRouter from "./product.js"
import generalRouter from "./general.js"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/categories", categoryRouter)
router.use("/products", productRouter)

router.use("/", generalRouter)

export default router
