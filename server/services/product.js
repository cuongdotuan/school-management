import Product from "../models/product.js"
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_VERSION,
} from "../constants.js"
import mongoose from "mongoose"
import ProductVersion from "../models/productVersion.js"

const MOCKED_THUMBNAIL =
  "https://media.gucci.com/style/White_South_0_160_316x316/1695142859/774548_ZAO9F_1000_001_100_0000_Light-Technical-fabric-coat.jpg"
const MOCKED_IMAGES = [
  "https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1695142859/774548_ZAO9F_1000_002_100_0000_Light-Technical-fabric-coat.jpg",
  "https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1695142863/774548_ZAO9F_1000_007_100_0000_Light-Technical-fabric-coat.jpg",
  "https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1695142864/774548_ZAO9F_1000_011_100_0000_Light-Technical-fabric-coat.jpg",
]

const get = async (query) => {
  const { pageSize, pageNumber, category } = query
  const size = pageSize && pageSize > 0 ? parseInt(pageSize) : DEFAULT_PAGE_SIZE
  const number =
    pageNumber && pageNumber > 0 ? parseInt(pageNumber) : DEFAULT_PAGE_NUMBER

  const totalItems = await Product.count()
  const totalPages = Math.ceil(totalItems / size)

  const skipItemsCount = (number - 1) * size

  const products = await Product.find().skip(skipItemsCount).limit(size).exec()

  const productIds = products.map((p) => p._id.toString())

  const versions = await ProductVersion.find({
    product: { $in: productIds },
    // "categories._id": { $elemMatch: { $eq: "654b04a91095bc3cd5d3707b" } },
  })
    .populate("categories", "name _id")
    .exec()

  const response = products.map((p) => {
    const initVersion = versions.find(
      (v) => v.product.toString() === p.id && v.version === DEFAULT_VERSION
    )
    const latestVersion = versions
      .filter((v) => v.product.toString() === p._id.toString())
      .sort((v1, v2) => v2.version - v1.version)[0]

    return {
      _id: p._id,
      originalPrice: initVersion?.price,
      price: latestVersion?.price,
      name: latestVersion?.name,
      color: latestVersion?.color,
      size: latestVersion?.size,
      thumbnail: latestVersion?.thumbnail,
      categories: latestVersion?.categories,
    }
  })

  return {
    items: response,
    pageSize: size,
    pageNumber: number,
    totalItems,
    totalPages,
  }
}

const getDetail = async (id) => {
  const exist = await Product.findById(id).exec()
  if (!exist) throw new Error()

  const initVersion = await ProductVersion.findOne({
    product: id,
    version: DEFAULT_VERSION,
  }).exec()
  if (!initVersion) throw new Error()

  const latestVersion = await ProductVersion.findOne({ product: id })
    .sort("-version")
    .exec()
  if (!latestVersion) throw new Error()

  const {
    name,
    description,
    price,
    color,
    size,
    thumbnail,
    images,
    categories,
  } = latestVersion
  const response = {
    _id: id,
    originalPrice: initVersion.price,
    price,
    name,
    description,
    color,
    size,
    thumbnail,
    images,
    categories,
  }
  return response
}

const create = async (payload) => {
  verifyProduct(payload)

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newProducts = await Product.create([{}], { session })
    const newPrd = newProducts[0]
    await ProductVersion.create(
      [
        {
          ...payload,
          product: newPrd?._id,
          thumbnail: MOCKED_THUMBNAIL, //temp
          images: MOCKED_IMAGES, //temp
        },
      ],
      {
        session,
      }
    )
    await session.commitTransaction()
    return newPrd._id
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const update = async (id, payload) => {
  verifyProduct(payload)

  const latestVersion = await ProductVersion.findOne({ product: id })
    .sort("-version")
    .exec()

  const nextVersion = latestVersion && latestVersion.version + 1

  await ProductVersion.create([
    {
      ...payload,
      version: nextVersion,
      product: id,
      images: latestVersion.images, //temp
      thumbnail: latestVersion.thumbnail, //temp
    },
  ])

  return id
}

const remove = async (id) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    await ProductVersion.deleteMany({ product: id }).session(session).exec()
    const result = await Product.findByIdAndDelete(id).exec()
    await session.commitTransaction()
    return result._id
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const verifyProduct = (product) => {
  if (!product) throw new Error()
  const {
    name,
    description,
    price,
    color,
    size,
    categories,
    thumbnail,
    images,
  } = product
  if (!name || !name.trim()) throw new Error("Name is required")
  if (!price || price <= 0) throw new Error("Price is required")
  if (!color || !color.trim()) throw new Error("Color is required")
  if (!size || !size.trim()) throw new Error("Size is required")
  if (!categories || categories.length === 0)
    throw new Error("Categories is required")
}

const productService = { get, getDetail, create, update, remove }

export default productService
