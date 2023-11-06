import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api"
import { AppContext } from "../../context"
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"

const EditProduct = () => {
  // const [detail, setDetail] = useState(null)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const data = useParams()
  const { setIsLoading, setSnackbar, setHeader } = useContext(AppContext)
  const navigate = useNavigate()

  const { control, handleSubmit, reset } = useForm()

  const onSubmit = (data) => console.log(data)
  useEffect(() => {
    let ignore = false
    const getDetail = async () => {
      try {
        setIsLoading(true)
        const res = await api.get(`/products/${data.id}`)
        if (!ignore) {
          reset(res.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getDetail()
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false
    const getCategory = async () => {
      try {
        setIsLoading(true)
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
    let ignore = false
    const getSizes = async () => {
      try {
        setIsLoading(true)
        const respone = await api.get(`/sizes`)
        if (!ignore) {
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

  // const onSubmit = () => {
  //   setIsLoading(true)
  //   const putUpdate = async () => {
  //     try {
  //       await api.put(`/products/${data.id}`, detail)
  //       setSnackbar({
  //         openSnackbar: true,
  //         snackbarMessage: "Success",
  //         snackbarSeverity: "success",
  //       })
  //       navigate(`/product`)
  //     } catch (error) {
  //       console.log(error)
  //       setSnackbar({
  //         openSnackbar: true,
  //         snackbarMessage: "Error",
  //         snackbarSeverity: "error",
  //       })
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   putUpdate()
  // }

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type="text"
              className="w-full"
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              {...field}
              className="w-full"
            />
          )}
        />
        <Controller
          name="price"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              type="number"
              className="w-full"
              {...field}
            />
          )}
        />
        <Controller
          name="color"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Color"
              variant="outlined"
              type="text"
              className="w-full"
              {...field}
            />
          )}
        />
        <Controller
          name="size"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              className="w-full"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Size"
              {...field}
            >
              {sizes.map((s) => {
                return (
                  <MenuItem
                    key={s}
                    value={s}
                  >
                    {s}
                  </MenuItem>
                )
              })}
            </Select>
          )}
        />
        <Button
          variant="contained"
          type="submit"
          className="w-2/5 mx-auto"
        >
          Change
        </Button>
      </form>
    </>
  )
}

export default EditProduct
