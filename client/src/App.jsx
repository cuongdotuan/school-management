import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom"
import "./App.css"
import Home from "./pages/admin/Home"
import CategoryCreate from "./pages/admin/category/Create"
import CategoryEdit from "./pages/admin/category/Edit"
import CategoryList from "./pages/admin/category/List"
import CustomerDetail from "./pages/admin/customer/Detail"
import CustomerList from "./pages/admin/customer/List"
import OrderDetail from "./pages/admin/order/Detail"
import OrderList from "./pages/admin/order/List"
import ProductCreate from "./pages/admin/product/Create"
import ProductEdit from "./pages/admin/product/Edit"
import ProductsList from "./pages/admin/product/List"

import CategoryIcon from "@mui/icons-material/Category"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import DescriptionIcon from "@mui/icons-material/Description"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import MenuIcon from "@mui/icons-material/Menu"
import PersonIcon from "@mui/icons-material/Person"
import AppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { styled, useTheme } from "@mui/material/styles"
import { AppContext } from "./context"
import Login from "./pages/admin/Login"
import { USER } from "./constants"
import handleLogOut from "./helper"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Landing from "./pages/commerce/Landing"
import NewList from "./pages/new/List"

const commerceRoutes = [{ path: "/", element: <Landing /> }]

const adminRoutes = [
  { path: "/", element: <Home /> },
  { path: "/customer", element: <CustomerList /> },
  { path: "/customer/view/:id", element: <CustomerDetail /> },
  { path: "/order", element: <OrderList /> },
  { path: "/order/view/:id", element: <OrderDetail /> },
  { path: "/product", element: <ProductsList /> },
  { path: "/product/edit/:id", element: <ProductEdit /> },
  { path: "/product/create", element: <ProductCreate /> },
  { path: "/category", element: <CategoryList /> },
  { path: "/category/edit/:id", element: <CategoryEdit /> },
  { path: "/category/create", element: <CategoryCreate /> },
]

const authRoutes = [
  { path: "/", element: <Login /> },
  { path: "/new", element: <NewList /> },
]
const drawerWidth = 240

const drawerItems = [
  {
    name: "Customer",
    icon: <PersonIcon />,
    url: "/customer",
  },
  {
    name: "Product",
    icon: <Inventory2Icon />,
    url: "/product",
  },
  {
    name: "Order",
    icon: <DescriptionIcon />,
    url: "/order",
  },
  {
    name: "Category",
    icon: <CategoryIcon />,
    url: "/category",
  },
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const AppLayout = () => {
  const theme = useTheme()
  const [openDrawer, setOpenDrawer] = useState(false)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const { header } = useContext(AppContext)
  const openProfileMenu = !!anchorEl

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }
  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const handleAccountLogoClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleAccountLogoClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box className="flex">
        <CssBaseline />
        <AppBar
          className="bg-red-500 fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(openDrawer && {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(openDrawer && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box className="flex justify-between items-center flex-1">
              <Typography
                variant="h6"
                noWrap
                component="div"
              >
                Shop Management
              </Typography>
              <Box>
                <Button onClick={handleAccountLogoClick}>
                  <AccountCircleIcon className="text-white" />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openProfileMenu}
                  onClose={handleAccountLogoClose}
                >
                  <MenuItem onClick={handleAccountLogoClose}>Profile</MenuItem>
                  <MenuItem onClick={handleAccountLogoClose}>
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleAccountLogoClose()
                      handleLogOut()
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={openDrawer}
          className="shrink-0 whitespace-nowrap box-border"
          sx={{
            width: drawerWidth,
            ...(openDrawer && {
              ...openedMixin(theme),
              "& .MuiDrawer-paper": openedMixin(theme),
            }),
            ...(!openDrawer && {
              ...closedMixin(theme),
              "& .MuiDrawer-paper": closedMixin(theme),
            }),
          }}
        >
          <Box
            className="bg-red-500 flex items-center justify-end"
            sx={{ padding: theme.spacing(0, 1), ...theme.mixins.toolbar }}
          >
            <IconButton
              onClick={handleDrawerClose}
              className="text-white"
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </Box>

          <Divider />

          <List>
            {drawerItems.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                className="block"
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openDrawer ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate(item.url)
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openDrawer ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: openDrawer ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          className="flex-1 h-screen pt-16"
        >
          <Box className=" p-6">
            <Typography
              variant="h4"
              gutterBottom
            >
              {header}
            </Typography>
            <Divider />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  )
}

const App = () => {
  const { user, isLoading, snackbar, setSnackbar } = useContext(AppContext)

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
  const { openSnackbar, snackbarMessage, snackbarSeverity } = snackbar

  return (
    <>
      {isLoading && (
        <Box className="fixed top-0 left-0 h-screen w-screen bg-zinc-900 opacity-80 z-[10000] flex justify-center items-center">
          <CircularProgress color="primary" />
        </Box>
      )}

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

      <BrowserRouter>
        <Routes>
          {user ? (
            <Route
              path="/"
              element={<AppLayout />}
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
            path="/*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
