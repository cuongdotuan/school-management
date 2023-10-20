import { useState } from "react"
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import "./App.css"
import Login from "./pages/Login"
import { Box } from "@mui/material"

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/*", element: <Navigate to="/" /> },
])

function App() {
  return (
    <Box className="min-h-screen">
      <RouterProvider router={router} />
    </Box>
  )
}

export default App
