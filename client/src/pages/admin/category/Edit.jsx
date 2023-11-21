import { Button, TextField } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api"
import { AppContext } from "../../../context"

const CategoryEdit = () => {
  const [detail, setDetail] = useState(null)
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
    <div className=" p-4 flex flex-col gap-3">
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

      <Button
        variant="contained"
        className="w-1/4 mx-auto"
        onClick={onSubmit}
      >
        Change
      </Button>
    </div>
  )
}

export default CategoryEdit
