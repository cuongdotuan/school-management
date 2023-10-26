import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context"
import { Box, Button, CircularProgress, Link } from "@mui/material"

import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"
import { useNavigate } from "react-router-dom"

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

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const { isLoading, setIsLoading } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    setIsLoading(true)
    const getCategory = async () => {
      try {
        const respone = await axios.get("http://127.0.0.1:8888/api/categories")
        setCategories(respone.data.items)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getCategory()
  }, [])

  return (
    <>
      {!isLoading && (
        <>
          <h1>Table Category</h1>
          <div className="flex justify-end mb-3">
            <Button className="bg-green-500 text-white text-base">
              Create Category
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell className="text-lg">Name</StyledTableCell>
                  <StyledTableCell
                    className="text-lg"
                    align="center"
                  >
                    Edit
                  </StyledTableCell>
                  <StyledTableCell
                    className="text-lg"
                    align="center"
                  >
                    Delete
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {categories.map((category) => (
                  <StyledTableRow key={category._id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="text-lg"
                    >
                      {category.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        className="text-zinc-600"
                        onClick={() =>
                          navigate(`/category/edit/${category._id}`)
                        }
                      >
                        <EditIcon />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button className="text-red-500">
                        <DeleteForeverIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}

export default CategoryList
