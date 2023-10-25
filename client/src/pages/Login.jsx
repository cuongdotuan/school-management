import React, { useContext } from "react"
import { Box, Button, Input, Select, TextField } from "@mui/material"
import axios from "axios"
import { Controller, useForm } from "react-hook-form"
import { UserContext } from "../context"
import { USER } from "../constants"

import CircularProgress from "@mui/material/CircularProgress"

const Login = () => {
  const { user, setUser, isLoading, setIsLoading } = useContext(UserContext)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const onSubmit = (data) => {
    const { username, password } = data
    setIsLoading(true)
    const login = async () => {
      try {
        let response = await axios.post(
          "http://127.0.0.1:8888/api/auth/login",
          { username, password }
        )
        setUser(response.data.user)
        localStorage.setItem(USER, JSON.stringify(response.data.user))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    login()
  }

  return (
    <Box className="flex justify-center items-center  ">
      {isLoading && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-zinc-900 opacity-80 z-50 flex justify-center items-center text-white">
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="primary" />
          </Box>
        </div>
      )}
      <Box className="shadow-xl w-80 flex flex-col gap-3  p-8 rounded-md bg-white">
        <h1 className="text-center">Shop Management</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                required
                label="Username"
                size="small"
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                required
                label="Password"
                size="small"
                type="password"
                {...field}
              />
            )}
          />

          <Button
            variant="contained"
            type="submit"
            className="mt-2 bg-red-500"
          >
            Log in
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default Login
