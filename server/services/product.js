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
    query.pageSize && query.pageSize > 0 ? query.pageSize : DEFAULT_PAGE_SIZE
  const pageNumber =
    query.pageNumber && query.pageNumber > 0
      ? query.pageNumber
      : DEFAULT_PAGE_NUMBER

  const totalItems = await Product.count()
  const totalPages = Math.ceil(totalItems / pageSize)

  const skipItemsCount = (pageNumber - 1) * pageSize

  const products = await Product.find()
    // .populate("categories", "name")
    .skip(skipItemsCount)
    .limit(pageSize)
    .exec()

  // console.log("item", items)

  const productIds = products.map((p) => p.id)

  // console.log("item", productIds)

  const versions = await ProductVersion.find({
    product: { $in: productIds },
  }).exec()

  console.log("versions", versions)

  const response = products.map((p) => {
    const initVersion = versions.find(
      (v) => v.product.toString() === p.id && v.version === DEFAULT_VERSION
    )
    const latestVersion = versions
      .filter((v) => v.product.toString() === p.id)
      .sort((v1, v2) => v2.version - v1.version)[0]

    console.log(initVersion, latestVersion)

    return {
      _id: p.id,
      originalPrice: initVersion?.price,
      name: latestVersion?.name,
      description: latestVersion?.description,
      price: latestVersion?.price,
      color: latestVersion?.color,
      size: latestVersion?.size,
      thumbnail: latestVersion?.thumbnail,
      images: latestVersion?.images,
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
    .populate("categories", "name")
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
    name,
    description,
    price,
    color,
    size,
    thumbnail,
    images,
    categories,
  }
  return response
}

const create = async (payload) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newProducts = await Product.create([{}], { session })
    const newPrd = newProducts[0]
    await ProductVersion.create(
      [{ ...payload, version: DEFAULT_VERSION, product: newPrd?.id }],
      { session }
    )
    await session.commitTransaction()
    return newPrd.id
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const update = async (id, payload) => {
  const latestVersion = await ProductVersion.findOne({ product: id })
    .sort("-version")
    .populate("categories", "name")
    .exec()
  console.log(latestVersion)
  const nextVersion = latestVersion?.version
    ? latestVersion.version + 1
    : DEFAULT_VERSION

  await ProductVersion.create([
    { ...payload, version: nextVersion, product: id },
  ])

  return id
}

const remove = async (id) => {
  const result = await Product.findByIdAndDelete(id).exec()
  return result.id
}

const productService = { get, getDetail, create, update, remove }

export default productService
