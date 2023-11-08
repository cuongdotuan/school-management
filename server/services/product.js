import Product from "../models/product.js"
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_VERSION,
} from "../constants.js"
import mongoose from "mongoose"
import ProductVersion from "../models/productVersion.js"

const get = async (query) => {
  const pageSize =
    query.pageSize && query.pageSize > 0
      ? parseInt(query.pageSize)
      : DEFAULT_PAGE_SIZE
  const pageNumber =
    query.pageNumber && query.pageNumber > 0
      ? parseInt(query.pageNumber)
      : DEFAULT_PAGE_NUMBER

  const totalItems = await Product.count()
  const totalPages = Math.ceil(totalItems / pageSize)

  const skipItemsCount = (pageNumber - 1) * pageSize

  const products = await Product.find()
    .skip(skipItemsCount)
    .limit(pageSize)
    .exec()

  const productIds = products.map((p) => p.id)

  const versions = await ProductVersion.find({
    product: { $in: productIds },
  })
    .populate("categories", "name _id")
    .exec()

  const response = products.map((p) => {
    const initVersion = versions.find(
      (v) => v.product.toString() === p.id && v.version === DEFAULT_VERSION
    )
    const latestVersion = versions
      .filter((v) => v.product.toString() === p.id)
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
    pageSize,
    pageNumber,
    totalItems,
    totalPages,
  }
}

const getDetail = async (id) => {
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

  const {
    name,
    description,
    price,
    color,
    size,
    categories,
    thumbnail,
    images,
  } = payload

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newProducts = await Product.create([{}], { session })
    const newPrd = newProducts[0]
    await ProductVersion.create(
      [
        {
          name,
          description,
          price,
          color,
          size,
          categories,
          product: newPrd?._id,
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

  const {
    name,
    description,
    price,
    color,
    size,
    categories,
    thumbnail,
    images,
  } = payload

  const latestVersion = await ProductVersion.findOne({ product: id })
    .sort("-version")
    .exec()

  const nextVersion = latestVersion && latestVersion.version + 1

  await ProductVersion.create([
    {
      name,
      description,
      price,
      color,
      size,
      categories,
      version: nextVersion,
      product: id,
    },
  ])

  return id
}

const remove = async (id) => {
  const result = await Product.findByIdAndDelete(id).exec()
  return result._id
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
