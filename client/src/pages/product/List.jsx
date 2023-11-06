import React, { useContext, useEffect, useState } from "react"
import api from "../../api"
import { useNavigate } from "react-router-dom"
import { DEFAULT_PAGINATION, PAGE_SIZE_OPTIONS } from "../../constants"
import { AppContext } from "../../context"

import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"

let totalProducts
let totalPages

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.PAGE_SIZE)
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGINATION.PAGE_NUMBER)
  const [pageInput, setPageInput] = useState("")
  const navigate = useNavigate()
  const { isLoading, setIsLoading, setHeader } = useContext(AppContext)

  useEffect(() => {
    setIsLoading(true)
    let ignore = false
    const getCategory = async () => {
      try {
        const respone = await api.get(
          `/products?pageSize=${pageSize}&pageNumber=${pageNumber}`
        )
        if (!ignore) {
          console.log(respone.data)
          setProducts(respone.data.items)
          totalProducts = respone.data.totalItems
          totalPages = respone.data.totalPages
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getCategory()
    return () => {
      ignore = true
    }
  }, [pageNumber, pageSize])

  useEffect(() => {
    setHeader("Products")
    return () => {
      setHeader("Shop Management")
    }
  }, [])

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value)
  }
  const handleClickNextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const handleClickPrevPage = () => {
    setPageNumber(pageNumber - 1)
  }

  const handleChangePageNumber = (e) => {
    setPageInput(e.target.value)
  }
  const handleSetPageNumber = (e) => {
    if (e.keyCode === 13) {
      if (parseInt(pageInput) > totalPages) {
        setPageNumber(1)
        return
      }
      setPageNumber(parseInt(pageInput))
    }
  }

  return (
    <>
      {!isLoading && (
        <>
          <div className="flex justify-end my-3">
            <Button
              className="bg-green-500 text-white text-base"
              onClick={() => navigate(`/product/create`)}
            >
              Create Product
            </Button>
          </div>
          <div className="flex justify-end mb-1">
            <span>Total Products: {totalProducts}</span>
          </div>
          <TableContainer
            component={Paper}
            className="mb-3"
          >
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell className="text-lg">#</StyledTableCell>
                  <StyledTableCell className="text-lg">Name</StyledTableCell>
                  <StyledTableCell
                    className="text-lg"
                    align="center"
                  >
                    OriginPrice
                  </StyledTableCell>
                  <StyledTableCell
                    className="text-lg"
                    align="center"
                  >
                    Price
                  </StyledTableCell>
                  <StyledTableCell
                    className="text-lg"
                    align="center"
                  >
                    Size
                  </StyledTableCell>
                  <StyledTableCell
                    className="text-lg"
                    align="center"
                  >
                    Color
                  </StyledTableCell>
                  <StyledTableCell
                    className="text-lg"
                    align="center"
                  >
                    Operations
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product, idx) => (
                  <StyledTableRow key={product._id}>
                    <StyledTableCell className="text-lg">
                      {(pageNumber - 1) * pageSize + idx + 1}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="text-lg"
                    >
                      {product.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="text-lg"
                    >
                      {product.originalPrice}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="text-lg"
                    >
                      {product.price}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="text-lg"
                    >
                      {product.size}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="text-lg"
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: product.color,
                          margin: "0 auto",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        className="text-zinc-600"
                        onClick={() => navigate(`/product/edit/${product._id}`)}
                      >
                        <EditIcon />
                      </Button>
                      <Button className="text-red-500">
                        <DeleteForeverIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box className="flex items-center justify-end ">
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">PageSize</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={pageSize}
                label="PageSize"
                onChange={handleChangePageSize}
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <MenuItem
                    key={size}
                    value={size}
                  >
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box className="flex items-center">
              <Button
                onClick={handleClickPrevPage}
                disabled={pageNumber === 1}
              >
                <NavigateBeforeIcon />
              </Button>
              <Input
                type="number"
                defaultValue={pageNumber}
                className="w-9 "
                onChange={handleChangePageNumber}
                onKeyDown={handleSetPageNumber}
                inputProps={{ sx: { textAlign: "center" } }}
              />
              <Typography className="">/ {totalPages} Pages</Typography>
              <Button
                onClick={handleClickNextPage}
                disabled={pageNumber === totalPages}
              >
                <NavigateNextIcon />
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default ProductsList
