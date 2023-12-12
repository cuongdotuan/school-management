import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context"
import api from "../../api"
import { DEFAULT_PAGINATION } from "../../constants"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material"
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

  const fetchMore = () => {
    if (!fetching) {
      setPageNumber((pageNumber) => pageNumber + 1)
      setFetching(true)
    }
  }
  return (
    <>
      <Box className="max-w-7xl mx-auto flex flex-wrap gap-6 mt-10">
        {products.map((prd) => (
          <Box
            key={prd._id}
            className="w-[23%] mb-4 flex flex-col gap-3 cursor-pointer duration-200 hover:shadow-md hover:scale-105 "
            onClick={() => navigate(`/product/${prd._id}`)}
          >
            <img
              src={prd.thumbnail}
              alt=""
              className="w-full  flex-1 object-cover"
            />
            <Tooltip
              title={prd.name}
              placement="top"
              TransitionComponent={Zoom}
            >
              <Box className="mx-2">
                <Typography className="uppercase text-base inline-block w-60 whitespace-nowrap overflow-hidden text-ellipsis">
                  {prd.name}
                </Typography>

                {prd.price === prd.originalPrice ? (
                  <Typography className="font-medium text-zinc-600">
                    $ {prd.price}
                  </Typography>
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
            </Tooltip>

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
        <Box className="flex items-center justify-center">
          <Button
            className="flex justify-center items-center  mb-5 bg-white rounded-full  border-solid border-2 border-black text-black"
            onClick={fetchMore}
            variant="contained"
          >
            <Typography className="text-lg ">See more...</Typography>
            <ArrowDropDownIcon className="text-lg " />
          </Button>
        </Box>
      )}
    </>
  )
}

export default NewList
