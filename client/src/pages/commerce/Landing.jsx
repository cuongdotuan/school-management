import { Box } from "@mui/material"

const Landing = () => {
  return (
    <>
      <Box>
        <img
          src="../../../slider_1.jpg"
          alt=""
          className="w-full"
        />
      </Box>
      <Box className="flex gap-5 p-5">
        <Box className="flex-1 relative cursor-pointer">
          <img
            src="../../../top.jpg"
            alt=""
            className="w-full"
          />
          <Box className="absolute flex justify-center items-center top-0 left-0 w-full h-full text-white font-medium text-7xl bg-black opacity-60 hover:opacity-0 transition-opacity">
            TOP
          </Box>
        </Box>
        <Box className="flex-1 relative cursor-pointer">
          <img
            src="../../../bot.jpg"
            alt=""
            className="w-full"
          />
          <Box className="absolute flex justify-center items-center top-0 left-0 w-full h-full text-white font-medium text-7xl bg-black opacity-60 hover:opacity-0 transition-opacity">
            BOTTOM
          </Box>
        </Box>
        <Box className="flex-1 relative cursor-pointer">
          <img
            src="../../../accessory.jpg"
            alt=""
            className="w-full"
          />
          <Box className="absolute flex justify-center items-center top-0 left-0 w-full h-full text-white font-medium text-7xl bg-black opacity-60 hover:opacity-0 transition-opacity">
            ACCESSORY
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Landing
