import { Box, Button, Checkbox, FormGroup, TextField } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api"
import { AppContext } from "../../../context"
import { CheckBox } from "@mui/icons-material"

const CategoryEdit = () => {
  const [detail, setDetail] = useState(null)
  const [isInNav, setIsInNav] = useState(false)
  const [isInFilter, setIsInFilter] = useState(false)
  const data = useParams()
  const { setIsLoading, setSnackbar } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    const getDetail = async () => {
      const res = await api.get(`/categories/${data.id}`)
      setDetail(res.data)
    }
    getDetail()
  }, [])

  const handleChangeName = (e) => {
    setDetail({ ...detail, name: e.target.value })
  }
  const handleChangeNavCheckBox = (e) => {
    setIsInNav(e.target.checked)
    console.log(e.target.checked)
    setDetail({ ...detail, isInNavbar: e.target.checked })
  }
  const handleChangeFilterCheckBox = (e) => {
    console.log(e.target.checked)
    setIsInFilter(e.target.checked)
    setDetail({ ...detail, isInFilter: e.target.checked })
  }
  const onSubmit = () => {
    setIsLoading(true)
    const putUpdate = async () => {
      try {
        await api.put(`/categories/${data.id}`, detail)
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
    putUpdate()
  }
  return (
    <>
      <Box className=" p-4 flex flex-col gap-3">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          size="small"
          className="w-full"
          value={detail?.name || ""}
          onChange={handleChangeName}
        />
        <Box className="flex items-center">
          <Checkbox
            id="navbar"
            checked={!!detail?.isInNavbar}
            onChange={handleChangeNavCheckBox}
          />
          <label htmlFor="navbar">Is in Navbar</label>
        </Box>
        <Box>
          <Checkbox
            id="filter"
            checked={!!detail?.isInFilter}
            onChange={handleChangeFilterCheckBox}
          />
          <label htmlFor="filter">Is in Filter</label>
        </Box>
      </Box>
      <Button
        variant="contained"
        className="w-1/4 flex mx-auto"
        onClick={onSubmit}
      >
        save change
      </Button>
    </>
  )
}

export default CategoryEdit
