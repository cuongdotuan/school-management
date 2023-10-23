import React from "react"
import { Box, Button, TextField } from "@mui/material"
const handleSubmit = (e) => {
  console.log("submit")
}
const Login = () => {
  return (
    <Box className="flex justify-center items-center h-screen">
      <Box
        component="form"
        className="shadow-xl w-80 flex flex-col gap-3  p-8 rounded-md bg-white"
      >
        <TextField
          required
          label="Username"
          size="small"
        />
        <TextField
          required
          label="Password"
          type="password"
          size="small"
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Box>
    </Box>
  )
}

export default Login
