import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const CommerceLayout = () => {
  return (
    <>
      <Box className="bg-zinc-400 fixed top-0 left-0 w-full h-24 z-50">
        Header
      </Box>
      <Box className="flex flex-col pt-24 min-h-[calc(100vh-4rem)]">
        <Box className="flex-1 p-6">
          <Outlet />
        </Box>
        <Box className="bg-red-500 h-48">Footer</Box>
      </Box>
    </>
  )
}

export default CommerceLayout
