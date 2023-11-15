import fs from "fs"

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE_NUMBER = 1

export const STATUS_CODE_MESSAGE = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
}

export const DEFAULT_VERSION = 1

let wards = []
let districts = []
let provinces = []

const wardsText = fs.readFileSync("./data/wards.json", { encoding: "utf-8" })
const districtsText = fs.readFileSync("./data/districts.json", {
  encoding: "utf-8",
})
const provincesText = fs.readFileSync("./data/provinces.json", {
  encoding: "utf-8",
})

try {
  wards = JSON.parse(wardsText)
} catch (error) {}

try {
  districts = JSON.parse(districtsText)
} catch (error) {}

try {
  provinces = JSON.parse(provincesText)
} catch (error) {}

export const ADDRESSES = {
  WARDS: wards,
  DISTRICTS: districts,
  PROVINCES: provinces,
}

export const SIZES = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
}
