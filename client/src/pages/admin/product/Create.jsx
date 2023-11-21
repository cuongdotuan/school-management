import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, MenuItem, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import api from "../../../api"
import { AppContext } from "../../../context"

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().min(1, "Price must be greater than 0").required(),
    color: yup.string().required(),
    size: yup.string().required(),
    categories: yup.array().of(yup.string()),
  })
  .required()

const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const { setIsLoading, setHeader, setSnackbar } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      color: "",
      size: "",
      categories: [],
    },
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    console.log(data)
    const createProduct = async () => {
      try {
        setIsLoading(true)
        await api.post("/products", data)
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
    createProduct()
  }

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
    setHeader("Create Product")
    return () => {
      setHeader(" Shop Management")
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

  return (
    <form
      className="flex flex-col gap-4 mt-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              size="small"
              label="Name"
              className="w-full"
              {...field}
              {...register("name")}
            />
          )}
        ></Controller>
        <p className="m-0 text-red-500">{errors.name?.message}</p>
      </Box>

      <Box>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              className="w-full"
              multiline
              maxRows={4}
              size="small"
              {...field}
              {...register("description")}
            />
          )}
        />
        <p className="m-0 text-red-500">{errors.description?.message}</p>
      </Box>

      <Box className="flex gap-3">
        <Box className="flex-1">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                label="Price"
                className="w-full"
                type="number"
                {...field}
                {...register("price")}
              />
            )}
          />
          <p className="m-0 text-red-500">{errors.price?.message}</p>
        </Box>

        <Box className="flex-1">
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                label="Color"
                className="w-full"
                {...field}
                {...register("color")}
              />
            )}
          />
          <p className="m-0 text-red-500">{errors.color?.message}</p>
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
                size="small"
                label="Size"
                {...field}
                {...register("size")}
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
          <p className="m-0 text-red-500">{errors.size?.message}</p>
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
          <p className="m-0 text-red-500">{errors.size?.message}</p>
        </Box>
      </Box>

      <Button
        variant="contained"
        type="submit"
        className="w-1/2 mx-auto"
      >
        Create New Product
      </Button>
    </form>
  )
}

export default CreateProduct
