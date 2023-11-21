import { Box, Button, Menu, MenuItem } from "@mui/material"
import { useContext, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import CategoryIcon from "@mui/icons-material/Category"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import DescriptionIcon from "@mui/icons-material/Description"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import MenuIcon from "@mui/icons-material/Menu"
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
import { useTheme } from "@mui/material/styles"
import { AppContext } from "../context"
import handleLogOut from "../helper"

const drawerWidth = 240

const drawerItems = [
  {
    name: "Product",
    icon: <Inventory2Icon />,
    url: "product",
  },
  {
    name: "Category",
    icon: <CategoryIcon />,
    url: "category",
  },
  {
    name: "Order",
    icon: <DescriptionIcon />,
    url: "order",
  },
]

const AdminLayout = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false)
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
                <MenuItem onClick={handleAccountLogoClose}>My account</MenuItem>
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
                  navigate(`/admin/${item.url}`)
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
        className="flex-1 h-screen pt-24 pb-8 px-8"
      >
        <Typography variant="h4">{header}</Typography>
        <Divider className="my-4" />
        <Outlet />
      </Box>
    </Box>
  )
}

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

export default AdminLayout
