import React from "react"
import { useParams } from "react-router-dom"

const CategoryEdit = () => {
  const data = useParams()
  return <div>CategoryEdit {data.id}</div>
}

export default CategoryEdit
