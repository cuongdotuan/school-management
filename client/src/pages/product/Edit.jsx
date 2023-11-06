import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api"
import { AppContext } from "../../context"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"

const EditProduct = () => {
  const [detail, setDetail] = useState(null)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const data = useParams()
  const { setIsLoading, setSnackbar, setHeader } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    const getDetail = async () => {
      const res = await api.get(`/products/${data.id}`)
      setDetail(res.data)
    }
    getDetail()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    let ignore = false
    const getCategory = async () => {
      try {
        const respone = await api.get(`/categories`)
        if (!ignore) {
          setCategories(respone.data.items)
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
  }, [])

  useEffect(() => {
    setIsLoading(true)
    let ignore = false
    const getSizes = async () => {
      try {
        const respone = await api.get(`/sizes`)
        if (!ignore) {
          console.log(respone.data)
          setSizes(respone.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getSizes()
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    setHeader("Edit Product Information")
    return () => {
      setHeader(" Shop Management")
    }
  }, [])

  console.log(detail)
  const handleChangeName = (e) => {
    setDetail({ ...detail, name: e.target.value })
  }
  const handleChangeCategory = (e) => {
    setDetail({ ...detail, categories: e.target.value })
  }

  const handleChangePrice = (e) => {
    setDetail({ ...detail, price: e.target.value })
  }
  const handleChangeSize = (e) => {
    setDetail({ ...detail, size: e.target.value })
  }
  const handleChangeColor = (e) => {
    setDetail({ ...detail, color: e.target.value })
  }
  const handleChangeThumbnail = (e) => {
    setDetail({ ...detail, thumbnail: e.target.value })
  }
  const onSubmit = () => {
    setIsLoading(true)
    const putUpdate = async () => {
      try {
        await api.put(`/products/${data.id}`, detail)
        setSnackbar({
          openSnackbar: true,
          snackbarMessage: "Success",
          snackbarSeverity: "success",
        })
        navigate(`/product`)
      } catch (error) {
        console.log(error)
        setSnackbar({
          openSnackbar: true,
          snackbarMessage: "Error",
          snackbarSeverity: "error",
        })
      } finally {
        setIsLoading(false)
      }
    }
    putUpdate()
  }

  return (
    <>
      <div className="mx-auto p-4 shadow-xl flex flex-col gap-5">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          className="w-full"
          value={detail?.name || ""}
          onChange={handleChangeName}
        />

        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          type="number"
          className="w-full"
          value={detail?.price || ""}
          onChange={handleChangePrice}
        />
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          className="m-0"
        >
          <InputLabel id="demo-select-small-label">Size</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={detail?.size || ""}
            label="Size"
            onChange={handleChangeSize}
          >
            {sizes.map((s, idx) => (
              <MenuItem
                key={idx}
                value={s}
              >
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Color"
          variant="outlined"
          type="text"
          className="w-full"
          value={detail?.color || ""}
          onChange={handleChangeColor}
        />
        <TextField
          id="outlined-basic"
          label="Thumbnail"
          variant="outlined"
          type="text"
          className="w-full"
          value={detail?.thumbnail || ""}
          onChange={handleChangeThumbnail}
        />

        <Button
          variant="contained"
          className="w-full"
          onClick={onSubmit}
        >
          change
        </Button>
      </div>
    </>
  )
}

export default EditProduct
function setHeader(arg0) {
  throw new Error("Function not implemented.")
}
