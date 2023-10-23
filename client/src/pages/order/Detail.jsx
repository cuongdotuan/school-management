import React from "react"
import { useParams } from "react-router-dom"

const OrderDetail = () => {
  const data = useParams()
  return <div>Order Detail {data.id}</div>
}

export default OrderDetail
