import { Box, Button, Divider, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api"
import { AppContext } from "../../context"

const Detail = () => {
  const [product, setProduct] = useState(null)
  const [imgIndex, setImgIndex] = useState(0)
  const param = useParams()
  const store = useContext(AppContext)
  const { cart, setCart, setSnackbar } = store
  useEffect(() => {
    let ignore = false
    const getProductDetail = async () => {
      try {
        const res = await api.get(`products/${param.id}`)
        console.log(res)
        if (!ignore) {
          setProduct(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getProductDetail()
    return () => {
      ignore = true
    }
  }, [])

  const handleChangeIndexImage = (idx) => {
    setImgIndex(idx)
  }

  const addToCart = () => {
    const foundProduct = cart.find((p) => p._id === product._id)
    if (!foundProduct) {
      const newProduct = { ...product, quantity: 1 }
      setCart([...cart, newProduct])
      return
    }

    const newProducts = cart.map((p) => {
      if (p._id === product._id) {
        const newProduct = { ...p, quantity: p.quantity + 1 }
        return newProduct
      }
      return p
    })
    setCart(newProducts)
  }
  return (
    <>
      {product && (
        <Box className="flex gap-5 max-w-7xl mx-auto mt-10">
          <Box className="flex-[2] flex flex-col items-end gap-1 cursor-pointer h-[600px] overflow-y-auto">
            {product.images.map((img, idx) => (
              <Box key={idx}>
                <img
                  src={img}
                  alt=""
                  className="w-28 "
                  onClick={() => handleChangeIndexImage(idx)}
                />
              </Box>
            ))}
          </Box>

          <Box className="flex-[3] ">
            <img
              src={product.images[imgIndex]}
              alt=""
              className="w-full"
            />
          </Box>

          <Box className="flex-[2]">
            <Typography className="text-2xl font-medium text-zinc-600 py-2">
              {product.name.toUpperCase()}
            </Typography>
            <Box className="h-[2px] bg-gradient-to-r from-purple-500 to-pink-500" />
            {product.price === product.originalPrice ? (
              <>
                <Typography className="text-xl py-2">
                  $ {product.price}
                </Typography>
                <Box className="h-[2px] bg-gradient-to-r from-purple-500 to-pink-500" />
              </>
            ) : (
              <>
                <Box className="flex items-center gap-5 py-2">
                  <Typography className="text-xl">$ {product.price}</Typography>
                  <Typography className="line-through text-zinc-400 italic text-sm">
                    $ {product.originalPrice}
                  </Typography>
                </Box>
                <Typography className="mb-2">
                  Save: $ {product.originalPrice - product.price}
                </Typography>
                <Box className="h-[2px] bg-gradient-to-r from-purple-500 to-pink-500" />
              </>
            )}
            <Button
              variant="contained"
              color="success"
              className="w-full my-4 bg-green-500"
              onClick={addToCart}
            >
              add to cart
            </Button>

            <Typography>{product.description}</Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

export default Detail
