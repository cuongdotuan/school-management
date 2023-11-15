import { createContext, useState } from "react"
import { USER } from "..//constants"

export const AppContext = createContext(null)

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [header, setHeader] = useState("Shop management")
  const [snackbar, setSnackbar] = useState({
    openSnackbar: false,
    snackbarMessage: "",
    snackbarSeverity: undefined,
  })

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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider
