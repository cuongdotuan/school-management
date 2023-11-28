import { Box, Typography, Link, Divider } from "@mui/material"
import { Outlet } from "react-router-dom"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import SearchIcon from "@mui/icons-material/Search"
import LocalMallIcon from "@mui/icons-material/LocalMall"
import HomeIcon from "@mui/icons-material/Home"
import PinDropIcon from "@mui/icons-material/PinDrop"
import EmailIcon from "@mui/icons-material/Email"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import { useEffect, useState } from "react"
import api from "../api"
const CommerceLayout = () => {
  const [categoriesNavbar, setCategoriesNavber] = useState([])
  useEffect(() => {
    let ignore = false
    const getCategoriesInNavbar = async () => {
      try {
        const res = await api.get(`/categories/navbar`)
        if (!ignore) {
          setCategoriesNavber(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCategoriesInNavbar()
    return () => {
      ignore = false
    }
  }, [])
  return (
    <>
      <Box className="bg-zinc-400 fixed top-0 left-0 w-full h-24 z-50">
        <Box className="flex justify-between items-center py-2">
          <Box className="flex flex-1 gap-5 pl-8">
            <Typography className="text-sm font-medium flex items-center gap-1">
              <LocationOnIcon className="text-base" />
              ĐỊA CHỈ: VIỆT NAM
            </Typography>
            <Typography className="text-sm font-medium flex items-center gap-1">
              <LocalPhoneIcon className="text-base" />
              ĐIỆN THOẠI: 0961222333
            </Typography>
          </Box>
          <Box className="flex-[2] flex flex-col gap-3">
            <Typography className="text-5xl font-semibold text-center">
              ECOMMERCE
            </Typography>
            <Box className="flex justify-around items-center ">
              <Link
                href="/"
                underline="none"
                color="black"
              >
                {"Home"}
              </Link>
              <Link
                href="/product"
                underline="none"
                color="black"
              >
                {"Products"}
              </Link>
              {categoriesNavbar.map((category, idx) => (
                <Link
                  key={idx}
                  href="#"
                  underline="none"
                  color="black"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="#"
                underline="none"
                color="black"
              >
                {"About Us"}
              </Link>
              <Link
                href="#"
                underline="none"
                color="black"
              >
                {"Blog"}
              </Link>
              <Link
                href="#"
                underline="none"
                color="black"
              >
                {"Contact"}
              </Link>
            </Box>
          </Box>
          <Box className="flex gap-5 flex-1 justify-end items-center pr-8">
            <Typography className="flex items-center">
              <SearchIcon className="text-base" />
            </Typography>
            <Typography className="text-sm font-medium flex items-center gap-1">
              <LocalMallIcon className="text-base" />
              GIỎ HÀNG
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="flex flex-col pt-24 min-h-[calc(100vh-4rem)]">
        <Box className="flex-1 ">
          <Outlet />
        </Box>

        <Divider />
        <Box className=" h-48 pt-4">
          <Box className="flex px-28">
            <Box className="flex-1 flex flex-col gap-2">
              <Typography className="text-5xl font-medium">
                ECOMMERCE
              </Typography>
              <Box className="flex items-center gap-1">
                <LocalShippingIcon />
                Nationwide shipping
              </Box>

              <Box className="flex items-center gap-1">
                <CardGiftcardIcon />
                Free shipping for orders over 500$
              </Box>
            </Box>

            <Box className="flex-1 flex flex-col gap-2">
              <Typography className="text-2xl">Contact</Typography>

              <Box className="flex items-center gap-1">
                <HomeIcon />
                Ecommerce Store
              </Box>
              <Box className="flex items-center gap-1">
                <PinDropIcon /> Thanh Xuân - Hà Nội
              </Box>
              <Box className="flex items-center gap-1">
                <EmailIcon /> ecommerce@gmail.com
              </Box>
              <Box className="flex items-center gap-1">
                <LocalPhoneIcon />
                0961222333
              </Box>
            </Box>

            <Box className="flex-1 flex flex-col gap-3">
              <Typography className="text-2xl">Policy</Typography>
              <Link
                href="#"
                underline="none"
                color="black"
              >
                {"Members"}
              </Link>
              <Link
                href="#"
                underline="none"
                color="black"
              >
                {"To return"}
              </Link>
              <Link
                href="#"
                underline="none"
                color="black"
              >
                {"Shipping"}
              </Link>
            </Box>

            <Box className="flex-1 flex flex-col gap-2">
              <Typography className="text-2xl">Link</Typography>
              <Box className="flex items-center gap-1">
                <FacebookIcon />
                <Link
                  href="#"
                  underline="none"
                  color="black"
                >
                  {"Facebook"}
                </Link>
              </Box>
              <Box className="flex items-center gap-1">
                <InstagramIcon />
                <Link
                  href="#"
                  underline="none"
                  color="black"
                >
                  {"Instagram"}
                </Link>
              </Box>

              <Box className="flex items-center gap-1">
                <YouTubeIcon />
                <Link
                  href="#"
                  underline="none"
                  color="black"
                >
                  {"Youtube"}
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CommerceLayout
