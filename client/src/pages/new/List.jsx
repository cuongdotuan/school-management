import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context"
import api from "../../api"
import { DEFAULT_PAGINATION } from "../../constants"
import { useNavigate } from "react-router-dom"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
let totalPages
const pageSize = 12

// function elementInViewport(el) {
//   var top = el.offsetTop
//   var left = el.offsetLeft
//   var width = el.offsetWidth
//   var height = el.offsetHeight

//   while (el.offsetParent) {
//     el = el.offsetParent
//     top += el.offsetTop
//     left += el.offsetLeft
//   }

//   return (
//     top >= window.pageYOffset &&
//     left >= window.pageXOffset &&
//     top + height <= window.pageYOffset + window.innerHeight &&
//     left + width <= window.pageXOffset + window.innerWidth
//   )
// }

const NewList = () => {
  const { setIsLoading, isLoading } = useContext(AppContext)
  const [products, setProducts] = useState([])
  const [fetching, setFetching] = useState(true)
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGINATION.PAGE_NUMBER)
  const navigate = useNavigate()
  useEffect(() => {
    let ignore = false
    setFetching(true)
    const getCategory = async () => {
      try {
        const respone = await api.get(`/products`, {
          params: { pageSize, pageNumber },
        })
        if (!ignore) {
          setProducts((product) => {
            return [...product, ...respone.data.items]
          })

          totalPages = respone.data.totalPages
        }
      } catch (error) {
        console.log(error)
      } finally {
        setFetching(false)
      }
    }
    getCategory()
    return () => {
      ignore = true
    }
  }, [pageNumber])

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     const loading = document.getElementById("loading")
  //     const isInViewport = elementInViewport(loading)
  //     if (isInViewport && !fetching) {
  //       setPageNumber((pageNumber) => pageNumber + 1)
  //       setFetching(true)
  //     }
  //     console.log(isInViewport)
  //   })

  // }, [])

  const fetchMore = () => {
    if (!fetching) {
      setPageNumber((pageNumber) => pageNumber + 1)
      setFetching(true)
    }
  }
  return (
    <>
      <Box className="max-w-7xl mx-auto flex flex-wrap gap-6">
        {products.map((prd) => (
          <Box
            key={prd._id}
            className="w-[23%] mb-4 flex flex-col gap-3 cursor-pointer duration-200 hover:shadow-md hover:scale-105 "
          >
            <img
              src={prd.thumbnail}
              alt=""
              className="w-full object-cover"
            />
            <Box className="mx-2">
              <Typography className="uppercase text-base">
                {prd.name}
              </Typography>

              {prd.price === prd.originalPrice ? (
                <Typography className="font-medium">$ {prd.price}</Typography>
              ) : (
                <Box className="flex gap-5">
                  <Typography className="font-medium">
                    $ {prd.originalPrice}
                  </Typography>
                  <Typography className="line-through text-zinc-400 italic">
                    $ {prd.price}
                  </Typography>
                </Box>
              )}
            </Box>

            <Button
              color="secondary"
              size="large"
              className="mx-auto  w-full"
            >
              view detail
            </Button>
          </Box>
        ))}
      </Box>
      {fetching && (
        <Box className="flex justify-center items-center">
          <CircularProgress />
        </Box>
      )}

      {!fetching && pageNumber < totalPages && (
        <Box
          className="flex justify-center items-center cursor-pointer mb-5"
          onClick={fetchMore}
        >
          <Typography className="text-lg text-zinc-600">See more...</Typography>
          <ArrowDropDownIcon className="text-lg text-zinc-600" />
        </Box>
      )}
    </>
  )
}

export default NewList
