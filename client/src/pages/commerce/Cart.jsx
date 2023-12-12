import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
import { AppContext } from "../../context"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import api from "../../api"

const schema = yup
  .object({
    firstName: yup.string().required("First Name is require"),
    lastName: yup.string().required("Last Name is require"),
    phone: yup
      .string()
      .test("must-be-a-number", "Must a number", (value, context) => {
        if (typeof value != "string") return false
        return !isNaN(parseInt(value)) && !isNaN(parseFloat(value))
      })
      .required("Phone number is require"),
    email: yup.string().email("Wrong syntax"),
    city: yup.number().required("City is require"),
    district: yup.number().required("District is require"),
    ward: yup.number().required("Ward is require"),
    note: yup.string(),
  })
  .required()

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

const Cart = () => {
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const navigate = useNavigate()
  const { cart, setCart } = useContext(AppContext)
  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      city: null,
      district: null,
      ward: null,
      note: "",
    },
    resolver: yupResolver(schema),
  })
  const selectedCity = watch("city")
  const selectedDistrict = watch("district")

  const onSubmit = (data) => console.log(data)

  let totalPrice = 0
  for (let p of cart) {
    totalPrice = totalPrice + p.quantity * p.price
  }
  let feeShipping
  switch (selectedCity) {
    case 1:
      feeShipping = 5
      break
    case 79:
      feeShipping = 10
      break
    default:
      feeShipping = 0
      break
  }
  const handleRemove = (id) => {
    const confirmRemove = confirm("Do you want to remove this item?")
    if (confirmRemove) {
      const filteredProducts = cart.filter((p) => {
        return p._id !== id
      })
      setCart(filteredProducts)
    }
  }

  const handleIncrease = (id) => {
    const foundProduct = cart.find((p) => {
      return p._id === id
    })
    if (!foundProduct) return
    const newProducts = cart.map((p) => {
      if (p._id === id) {
        const newProduct = { ...p, quantity: p.quantity + 1 }
        return newProduct
      }
      return p
    })
    setCart(newProducts)
  }

  const handleDecrease = (id) => {
    const foundProduct = cart.find((p) => {
      return p._id === id
    })
    if (!foundProduct) return
    if (foundProduct.quantity === 1) {
      handleRemove(id)
      return
    }

    const newProducts = cart.map((p) => {
      if (p._id === id) {
        const newProduct = { ...p, quantity: p.quantity - 1 }
        return newProduct
      }
      return p
    })
    setCart(newProducts)
  }

  useEffect(() => {
    let ignore = false
    const getCity = async () => {
      try {
        const res = await api.get(`/provinces`)
        if (!ignore) {
          setCities(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCity()
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false
    const getDistrict = async () => {
      try {
        const res = await api.get(`/districts?provinceId=${selectedCity}`)
        if (!ignore) {
          setValue("district", null)
          setDistricts(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDistrict()
    return () => {
      ignore = true
    }
  }, [selectedCity])

  useEffect(() => {
    let ignore = false
    const getWard = async () => {
      try {
        const res = await api.get(`/wards?districtId=${selectedDistrict}`)

        if (!ignore) {
          setValue("ward", null)
          setWards(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getWard()
    return () => {
      ignore = true
    }
  }, [selectedCity, selectedDistrict])

  return (
    <>
      <Typography
        variant="h4"
        className="text-center pt-8 uppercase"
      >
        Checkout
      </Typography>

      <Box className="flex px-10 gap-2 mt-8">
        <Box className="flex-1 h-[500px] overflow-y-scroll">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((prd, idx) => (
                  <StyledTableRow key={prd._id}>
                    <StyledTableCell>{idx + 1}</StyledTableCell>
                    <StyledTableCell>
                      <ClearIcon
                        className="cursor-pointer text-red-400 hover:text-red-600 hover:scale-105"
                        onClick={() => handleRemove(prd._id)}
                      />
                    </StyledTableCell>

                    <StyledTableCell
                      className="cursor-pointer hover:text-green-500"
                      onClick={() => navigate(`/product/${prd._id}`)}
                    >
                      <Box className="flex gap-6 items-center">
                        <Box>
                          <img
                            src={prd.thumbnail}
                            alt=""
                            className="w-10 h-full"
                          />
                        </Box>
                        <Typography>{prd.name}</Typography>
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {prd.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box className="flex justify-center items-center gap-1">
                        <Button
                          className="text-zinc-500"
                          onClick={() => {
                            handleDecrease(prd._id)
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                        {prd.quantity}
                        <Button
                          className="text-zinc-500"
                          onClick={() => handleIncrease(prd._id)}
                        >
                          <AddIcon />
                        </Button>
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      $ {prd.price * prd.quantity}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box className="flex-1 bg-zinc-100">
          <Typography
            variant="h5"
            className="uppercase text-center"
          >
            information
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-3 flex flex-col gap-4"
          >
            <Box className="flex gap-3 ">
              <Box className="flex flex-col flex-1 ">
                <TextField
                  size="small"
                  label="First Name"
                  sx={{ backgroundColor: "white" }}
                  {...register("firstName")}
                />
                <Typography className="text-red-500">
                  {errors.firstName?.message}
                </Typography>
              </Box>

              <Box className="flex flex-col flex-1">
                <TextField
                  size="small"
                  label="Last Name"
                  sx={{ backgroundColor: "white" }}
                  {...register("lastName")}
                />
                <Typography className="text-red-500">
                  {errors.lastName?.message}
                </Typography>
              </Box>
            </Box>

            <Box className="flex gap-3">
              <Box className="flex-1 flex flex-col">
                <TextField
                  size="small"
                  label="Phone Number"
                  sx={{ backgroundColor: "white" }}
                  {...register("phone")}
                />
                <Typography className="text-red-500">
                  {errors.phone?.message}
                </Typography>
              </Box>
              <Box className="flex-1 flex flex-col">
                <TextField
                  size="small"
                  label="Email"
                  sx={{ backgroundColor: "white" }}
                  {...register("email")}
                />
                <Typography className="text-red-500">
                  {errors.email?.message}
                </Typography>
              </Box>
            </Box>

            <Box className="flex gap-3">
              <Box className="flex-1">
                <TextField
                  className="w-full bg-white"
                  id="outlined-select-currency"
                  select
                  label="City"
                  size="small"
                  defaultValue={""}
                  SelectProps={{
                    MenuProps: {
                      disableScrollLock: true,
                    },
                  }}
                  {...register("city")}
                >
                  {cities.map((c) => (
                    <MenuItem
                      key={c.id}
                      value={c.id}
                    >
                      {c.fullName}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box className="flex-1">
                <TextField
                  className="w-full bg-white"
                  id="outlined-select-currency"
                  select
                  label="District"
                  size="small"
                  defaultValue={""}
                  SelectProps={{
                    MenuProps: {
                      disableScrollLock: true,
                      sx: { height: 600 },
                    },
                  }}
                  {...register("district")}
                >
                  {districts.map((d) => (
                    <MenuItem
                      key={d.id}
                      value={d.id}
                    >
                      {d.fullName}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box className="flex-1">
                <TextField
                  className="w-full bg-white"
                  id="outlined-select-currency"
                  select
                  label="Ward"
                  size="small"
                  defaultValue={""}
                  SelectProps={{
                    MenuProps: {
                      disableScrollLock: true,
                      sx: { height: 600 },
                    },
                  }}
                  {...register("ward")}
                >
                  {wards.map((w) => (
                    <MenuItem
                      key={w.id}
                      value={w.id}
                    >
                      {w.fullName}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <Box className="flex">
              <TextField
                id="outlined-multiline-flexible"
                label="Note"
                sx={{ backgroundColor: "white", width: "100%" }}
                multiline
                rows={4}
                size="small"
                {...register("note")}
              />
            </Box>

            <Box className="flex justify-end">
              <Box className="w-1/2 ">
                <Box className="flex justify-between">
                  <Typography>Total Price</Typography>
                  <Typography>$ {totalPrice}</Typography>
                </Box>

                <Box className="flex justify-between">
                  <Typography>Shipping Fee</Typography>
                  <Typography>$ {feeShipping}</Typography>
                </Box>

                <Box className="flex justify-between">
                  <Typography className="font-medium text-lg">
                    Final Price
                  </Typography>
                  <Typography className="font-medium text-lg">
                    $ {totalPrice + feeShipping}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
            >
              submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default Cart
