import { Alert, Box, CircularProgress, Snackbar } from "@mui/material"
import { useContext } from "react"
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom"
import "./App.css"
import CategoryCreate from "./pages/admin/category/Create"
import CategoryEdit from "./pages/admin/category/Edit"
import CategoryList from "./pages/admin/category/List"
import OrderDetail from "./pages/admin/order/Detail"
import OrderList from "./pages/admin/order/List"
import ProductCreate from "./pages/admin/product/Create"
import ProductEdit from "./pages/admin/product/Edit"
import ProductsList from "./pages/admin/product/List"

import { AppContext } from "./context"
import AdminLayout from "./layouts/admin"
import Home from "./pages/admin/Home"
import Login from "./pages/admin/Login"
import Landing from "./pages/commerce/Landing"
import NewList from "./pages/commerce/List"
import CommerceLayout from "./layouts/commerce"
import Detail from "./pages/commerce/Detail"

const commerceRoutes = [
  { path: "", element: <Landing /> },
  { path: "product", element: <NewList /> },
  { path: "product/:id", element: <Detail /> },
]

const adminRoutes = [
  { path: "", element: <Home /> },
  { path: "order", element: <OrderList /> },
  { path: "order/view/:id", element: <OrderDetail /> },
  { path: "product", element: <ProductsList /> },
  { path: "product/edit/:id", element: <ProductEdit /> },
  { path: "product/create", element: <ProductCreate /> },
  { path: "category", element: <CategoryList /> },
  { path: "category/edit/:id", element: <CategoryEdit /> },
  { path: "category/create", element: <CategoryCreate /> },
]

const authRoutes = [{ path: "", element: <Login /> }]

const drawerWidth = 240

const App = () => {
  const { user } = useContext(AppContext)

  return (
    <>
      <Loading />
      <AppSnackbar />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CommerceLayout />}
          >
            {commerceRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          <Route
            path="/admin/*"
            element={<Outlet />}
          >
            {user ? (
              <Route
                path=""
                element={<AdminLayout />}
              >
                {adminRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            ) : (
              authRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))
            )}

            <Route
              path="*"
              element={<Navigate to="" />}
            />
          </Route>

          <Route
            path="/*"
            element={<Navigate to="" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Loading = () => {
  const { isLoading } = useContext(AppContext)
  return (
    <Box
      className={`fixed top-0 left-0 h-screen w-screen bg-zinc-900 opacity-80 z-[9999] flex justify-center items-center ${
        !isLoading && "hidden"
      }`}
    >
      <CircularProgress color="primary" />
    </Box>
  )
}

const AppSnackbar = () => {
  const { snackbar, setSnackbar } = useContext(AppContext)
  const { openSnackbar, snackbarMessage, snackbarSeverity } = snackbar

  const handleCloseSnackbar = (e, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar({
      openSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: undefined,
    })
  }
  return (
    <Snackbar
      open={openSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      className="top-20 min-w-[10%]"
      message="OK"
    >
      {openSnackbar ? (
        <Alert
          severity={snackbarSeverity}
          className="w-full"
        >
          {snackbarMessage}
        </Alert>
      ) : null}
    </Snackbar>
  )
}

export default App
