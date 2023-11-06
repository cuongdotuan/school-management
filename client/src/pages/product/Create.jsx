import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context"
import { useNavigate } from "react-router-dom"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"

const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL"]
const CreateProduct = () => {
  const [name, setName] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [price, setPrice] = useState("")
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")

  const { setIsLoading, setHeader, setSnackbar } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    setHeader("Create Category")
    return () => {
      setHeader(" Shop Management")
    }
  }, [])

  const onSubmit = () => {
    console.log("submit")
  }
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeOriginalPrice = (e) => {
    setOriginalPrice(e.target.value)
  }
  const handleChangePrice = (e) => {
    setPrice(e.target.value)
  }
  const handleChangeSize = (e) => {
    setSize(e.target.value)
  }
  const handleChangeColor = (e) => {
    setColor(e.target.value)
  }
  return (
    <div className="w-96 mx-auto p-4 shadow-xl">
      <h1>Create New Product</h1>
      <div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          type="text"
          className="w-full mb-2"
          value={name}
          onChange={handleChangeName}
        />
        <TextField
          id="outlined-basic"
          label="Original Price"
          variant="outlined"
          size="small"
          type="number"
          className="w-full mb-2"
          value={originalPrice}
          onChange={handleChangeOriginalPrice}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          size="small"
          type="number"
          className="w-full mb-2"
          value={price}
          onChange={handleChangePrice}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            className="mb-2"
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={size}
            label="Size"
            onChange={handleChangeSize}
          >
            {sizeOptions.map((size) => (
              <MenuItem
                key={size}
                value={size}
              >
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Color"
          variant="outlined"
          size="small"
          type="text"
          className="w-full mb-2"
          value={color}
          onChange={handleChangeColor}
        />
        <Button
          variant="contained"
          className="w-full mt-4"
          onClick={onSubmit}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

export default CreateProduct
