import { Box, Button, Checkbox, TextField } from "@mui/material"
import React, { useContext, useState } from "react"
import { AppContext } from "../../../context"
import api from "../../../api"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const CategoryCreate = () => {
  const [input, setInput] = useState("")
  const [isInNav, setIsInNav] = useState(false)
  const [isInFilter, setIsInFilter] = useState(false)
  const { setIsLoading, setHeader, setSnackbar } = useContext(AppContext)

  const navigate = useNavigate()

  useEffect(() => {
    setHeader("Create Category")
    return () => {
      setHeader(" Shop Management")
    }
  }, [])
  const handleChangeNameInput = (e) => {
    setInput(e.target.value)
  }
  const handleChangeNavCheckBox = (e) => {
    setIsInNav(e.target.checked)
  }
  const handleChangeFilterCheckBox = (e) => {
    setIsInFilter(e.target.checked)
  }
  const onSubmit = () => {
    setIsLoading(true)
    const createNewCategory = async () => {
      try {
        const newItem = {
          name: input,
          isInNavbar: isInNav,
          isInFilter: isInFilter,
        }
        await api.post("/categories", newItem)
        setSnackbar({
          openSnackbar: true,
          snackbarMessage: "Success",
          snackbarSeverity: "success",
        })
        navigate("/admin/category")
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    createNewCategory()
  }
  return (
    <>
      <div className=" p-4 flex flex-col gap-3">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          type="text"
          className="w-full"
          value={input}
          onChange={handleChangeNameInput}
        />
        <Box className="flex items-center">
          <Checkbox
            id="navbar"
            checked={isInNav}
            onChange={handleChangeNavCheckBox}
          />
          <label htmlFor="navbar">Is in Navbar</label>
        </Box>
        <Box>
          <Checkbox
            id="filter"
            checked={isInFilter}
            onChange={handleChangeFilterCheckBox}
          />
          <label htmlFor="filter">Is in Filter</label>
        </Box>
      </div>
      <Button
        variant="contained"
        className="w-1/4 flex mx-auto"
        onClick={onSubmit}
      >
        Create New Category
      </Button>
    </>
  )
}

export default CategoryCreate
