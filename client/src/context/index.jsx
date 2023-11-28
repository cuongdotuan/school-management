import { createContext, useEffect, useState } from "react"
import { USER } from "..//constants"
import { CART } from "../helper"

export const AppContext = createContext(null)

let initCart = []
try {
  const localCart = localStorage.getItem(CART)
  const parsed = JSON.parse(localCart)
  if (parsed) {
    initCart = parsed
  }
} catch {}

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [header, setHeader] = useState("Shop management")
  const [snackbar, setSnackbar] = useState({
    openSnackbar: false,
    snackbarMessage: "",
    snackbarSeverity: undefined,
  })

  const [cart, setCart] = useState(initCart)
  useEffect(() => {
    localStorage.setItem(CART, JSON.stringify(cart))
  }, [cart])

  try {
    const userLocal = localStorage.getItem(USER)
    const parsedUser = JSON.parse(userLocal)
    if (parsedUser && !user) {
      setUser(parsedUser)
    }
  } catch (error) {}

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        header,
        setHeader,
        snackbar,
        setSnackbar,
        cart,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider
