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
import Home from "./pages/Home"
import CategoryCreate from "./pages/category/Create"
import CategoryEdit from "./pages/category/Edit"
import CategoryList from "./pages/category/List"
import CustomerDetail from "./pages/customer/Detail"
import CustomerList from "./pages/customer/List"
import OrderDetail from "./pages/order/Detail"
import OrderList from "./pages/order/List"
import ProductCreate from "./pages/product/Create"
import ProductEdit from "./pages/product/Edit"
import ProductsList from "./pages/product/List"

import CategoryIcon from "@mui/icons-material/Category"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import DescriptionIcon from "@mui/icons-material/Description"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import MenuIcon from "@mui/icons-material/Menu"
import PersonIcon from "@mui/icons-material/Person"
import MuiAppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import MuiDrawer from "@mui/material/Drawer"
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
import Login from "./pages/Login"
import { USER } from "./constants"
import handleLogOut from "./helper"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const appRoutes = [
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
  { path: "/*", element: <Navigate to="/" /> },
]

const authRoutes = [
  { path: "/", element: <Login /> },
  { path: "/*", element: <Navigate to="/" /> },
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

const AppLayout = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const { isLoading, header, snackbar, setSnackbar } = useContext(AppContext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const openAccout = Boolean(anchorEl)

  const openSnackbar = snackbar.openSnackbar
  const snackbarMessage = snackbar.snackbarMessage
  const snackbarSeverity = snackbar.snackbarSeverity

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleAccountLogoClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleAccountLogoClose = () => {
    setAnchorEl(null)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      openSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: undefined,
    })
  }

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-zinc-900 opacity-80 z-50 flex justify-center items-center text-white">
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="primary" />
          </Box>
        </div>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        className="top-20 min-w-[10%]"
      >
        <Alert
          severity={snackbarSeverity}
          className="w-full"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box className="flex">
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          className="bg-red-500"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
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
                <Button
                  id="basic-button"
                  aria-controls={openAccout ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccout ? "true" : undefined}
                  onClick={handleAccountLogoClick}
                >
                  <AccountCircleIcon className="text-white" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openAccout}
                  onClose={handleAccountLogoClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
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
          open={open}
        >
          <DrawerHeader className="bg-red-500">
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
          </DrawerHeader>
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
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate(item.url)
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
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
  const [init, setInit] = useState(false)
  const { user, setUser } = useContext(AppContext)

  useEffect(() => {
    const userLocal = localStorage.getItem(USER)
    const parsedUser = JSON.parse(userLocal)
    if (parsedUser && !user && !init) {
      setUser(parsedUser)
    }
    setInit(true)
  }, [])

  if (!init) {
    return null
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route
            path="/"
            element={<AppLayout />}
          >
            {appRoutes.map((route) => (
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
