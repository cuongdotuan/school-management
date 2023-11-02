import { createContext, useState } from "react"

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
