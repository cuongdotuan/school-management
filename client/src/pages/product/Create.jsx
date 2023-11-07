import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context"
import { useNavigate } from "react-router-dom"
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
import api from "../../api"

const CreateProduct = () => {
  const [sizes, setSizes] = useState([])
  const { setIsLoading, setHeader, setSnackbar } = useContext(AppContext)
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      color: "",
      size: "",
    },
  })
  const onSubmit = (data) => console.log(data)

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
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            size="small"
            label="Name"
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            size="small"
            {...field}
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            size="small"
            label="Price"
            {...field}
          />
        )}
      />
      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <TextField
            size="small"
            label="Color"
            {...field}
          />
        )}
      />
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
