import express from "express"
import { SIZES, ADDRESSES } from "../constants.js"

const generalRouter = express.Router()

generalRouter.get("/sizes", (req, res) => res.json(SIZES))

generalRouter.get("/wards", (req, res) => {
  const { districtId } = req.query
  const wards = ADDRESSES.WARDS.filter((w) => `${w.provinceId}` === districtId)
  return res.json(wards)
})

generalRouter.get("/districts", (req, res) => {
  const { provinceId } = req.query
  const districts = ADDRESSES.DISTRICTS.filter(
    (d) => `${d.provinceId}` === provinceId
  )
  return res.json(districts)
})

generalRouter.get("/provinces", (req, res) => res.json(ADDRESSES.PROVINCES))

export default generalRouter
