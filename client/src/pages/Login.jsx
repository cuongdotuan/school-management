import React from "react"
import { Box, Button, TextField } from "@mui/material"
const Login = () => {
  return (
    <Box className="flex justify-center items-center h-screen">
      <Box
        component="form"
        className="shadow-xl w-80 flex flex-col gap-3  p-8 rounded-md"
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
        <Button variant="contained">Log in</Button>
      </Box>
    </Box>
  )
}

export default Login
