import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants.js"
import Category from "../models/category.js"

const get = async (query) => {
  const pageSize =
    query.pageSize && query.pageSize > 0
      ? parseInt(query.pageSize)
      : DEFAULT_PAGE_SIZE
  const pageNumber =
    query.pageNumber && query.pageNumber > 0
      ? parseInt(query.pageNumber)
      : DEFAULT_PAGE_NUMBER

  const totalItems = await Category.count()
  const totalPages = Math.ceil(totalItems / pageSize)

  const skipItemsCount = (pageNumber - 1) * pageSize

  const items = await Category.find()
    .skip(skipItemsCount)
    .limit(pageSize)
    .select("_id name isInNavbar isInFilter")
    .exec()

  return {
    items,
    pageSize,
    pageNumber,
    totalItems,
    totalPages,
  }
}

const getDetail = async (id) => {
  const item = await Category.findById(id).select("_id name").exec()
  return item
}

const getFromNavbar = async () => {
  const items = await Category.find({ isInNavbar: true })
    .select("_id name")
    .exec()

  return items
}

const create = async (payload) => {
  const { name } = payload
  if (!name || !name.trim()) throw new Error("Name is required")
  const exist = await Category.findOne({ name }).exec()
  if (exist) throw new Error("Duplicate name")
  const newCategory = { name }
  const result = await Category.create(newCategory)
  return result
}

const update = async (id, payload) => {
  const { name } = payload
  if (!name || !name.trim()) throw new Error("Name is required")
  const exist = await Category.findOne({ name, _id: { $ne: id } }).exec()
  if (exist) throw new Error("Duplicate name")
  const result = await Category.findByIdAndUpdate(id, { name }).exec()
  return result
}

const remove = async (id) => {
  const result = await Category.findByIdAndDelete(id).exec()
  return result
}

const categoryService = {
  get,
  getDetail,
  getFromNavbar,
  create,
  update,
  remove,
}

export default categoryService
