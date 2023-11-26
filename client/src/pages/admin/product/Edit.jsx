import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api"
import { AppContext } from "../../../context"
import {
  Box,
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
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const param = useParams()
  const { setIsLoading, setSnackbar, setHeader } = useContext(AppContext)
  const navigate = useNavigate()

  const { control, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    const updateProduct = async () => {
      try {
        setIsLoading(true)
        await api.put(`/products/${param.id}`, data)
        setSnackbar({
          openSnackbar: true,
          snackbarMessage: "Success",
          snackbarSeverity: "success",
        })
        navigate("/admin/product")
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
    updateProduct()
  }
  useEffect(() => {
    let ignore = false
    const getDetail = async () => {
      try {
        setIsLoading(true)
        const res = await api.get(`/products/${param.id}`)
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
              size="small"
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
        <Box className="flex gap-3">
          <Box className="flex-1">
            <Controller
              name="price"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Price"
                  size="small"
                  variant="outlined"
                  type="number"
                  className="w-full"
                  {...field}
                />
              )}
            />
          </Box>

          <Box className="flex-1">
            <Controller
              name="color"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Color"
                  size="small"
                  variant="outlined"
                  type="text"
                  className="w-full"
                  {...field}
                />
              )}
            />
          </Box>

          <Box className="flex-1">
            <Controller
              name="size"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  className="w-full"
                  select
                  label="Size"
                  size="small"
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
                </TextField>
              )}
            />
          </Box>

          <Box className="flex-1">
            <Controller
              name="categories"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <TextField
                  select
                  variant="outlined"
                  label="Category"
                  size="small"
                  className="w-full"
                  SelectProps={{
                    multiple: true,
                    displayEmpty: true,
                  }}
                  {...field}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category._id}
                      value={category._id}
                      sx={{ marginY: 0.4 }}
                    >
                      <span>{category.name}</span>
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Box>

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
