import Category from "../models/category.js"
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from "../constants.js"

const get = async (query) => {
  const pageSize =
    query.pageSize && query.pageSize > 0 ? query.pageSize : DEFAULT_PAGE_SIZE
  const pageNumber =
    query.pageNumber && query.pageNumber > 0
      ? query.pageNumber
      : DEFAULT_PAGE_NUMBER

  const totalItems = await Category.count()
  const totalPages = Math.ceil(totalItems / pageSize)

  const skipItemsCount = (pageNumber - 1) * pageSize

  const items = await Category.find()
    .skip(skipItemsCount)
    .limit(pageSize)
    .exec()
  return {
    items,
    totalItems,
    totalPages,
  }
}

const getDetail = async (id) => {
  const item = await Category.findById(id).exec()
  return item
}

const create = async (payload) => {
  const { name } = payload
  if (!name) throw new Error("Name is required")
  const exist = await Category.findOne({ name }).exec()
  if (exist) throw new Error("Duplicate name")
  const newCategory = { name }
  const result = await Category.create(newCategory)
  return result.id
}

const update = async (id, payload) => {
  const { name } = payload
  if (!name) throw new Error("Name is required")
  const result = await Category.findByIdAndUpdate(id, { name }).exec()
  return result.id
}

const remove = async (id) => {
  const result = await Category.findByIdAndDelete(id).exec()
  return result.id
}

const categoryService = { get, getDetail, create, update, remove }

export default categoryService
