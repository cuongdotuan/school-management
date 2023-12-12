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
import React, { useContext } from "react"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
import { AppContext } from "../../context"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const city = [
  { id: 1, name: "Ha Noi" },
  { id: 2, name: "Da Nang" },
  { id: 3, name: "TP Ho Chi Minh" },
]

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
    city: yup.number().required("Ward is require"),
    district: yup.string().required("District is require"),
    ward: yup.string().required("Ward is require"),
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
  const navigate = useNavigate()
  const { cart, setCart } = useContext(AppContext)
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      city: 10,
      district: "",
      ward: "",
      note: "",
    },
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)

  let totalPrice = 0
  for (let p of cart) {
    totalPrice = totalPrice + p.quantity * p.price
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
                  defaultValue={0}
                  SelectProps={{
                    MenuProps: {
                      disableScrollLock: true,
                    },
                  }}
                  {...register("city")}
                >
                  {city.map((c) => (
                    <MenuItem
                      key={c.name}
                      value={c.id}
                    >
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box className="flex-1">
                <TextField
                  className="w-full"
                  size="small"
                  label="District"
                  sx={{ backgroundColor: "white" }}
                  {...register("district")}
                />
                <Typography className="text-red-500">
                  {errors.district?.message}
                </Typography>
              </Box>
              <Box className="flex-1">
                <TextField
                  className="w-full"
                  size="small"
                  label="Ward"
                  sx={{ backgroundColor: "white" }}
                  {...register("ward")}
                />
                <Typography className="text-red-500">
                  {errors.ward?.message}
                </Typography>
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
                  <Typography>$ </Typography>
                </Box>

                <Box className="flex justify-between">
                  <Typography className="font-medium text-lg">
                    Final Price
                  </Typography>
                  <Typography className="font-medium text-lg">$ </Typography>
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
