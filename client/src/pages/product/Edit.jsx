import React from "react"
import { useParams } from "react-router-dom"

const EditProduct = () => {
  const data = useParams()
  return <div> Edit Product {data.id}</div>
}

export default EditProduct
