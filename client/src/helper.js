import { TOKEN, USER } from "./constants"

const handleLogOut = () => {
  localStorage.removeItem(USER)
  localStorage.removeItem(TOKEN)
  window.location.href = "/admin"
}

export default handleLogOut
