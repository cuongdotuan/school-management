import { Button, TextField } from "@mui/material"
import React, { useContext, useState } from "react"
import { UserContext } from "../../context"
import api from "../../api"
import { useNavigate } from "react-router-dom"

const CategoryCreate = () => {
  const [input, setInput] = useState("")
  const { setIsLoading } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }

  const onSubmit = () => {
    setIsLoading(true)
    const createNewCategory = async () => {
      try {
        const newItem = {
          name: input,
        }
        await api.post("/categories", newItem)
        navigate("/category")
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    createNewCategory()
  }
  return (
    <div className="w-96 mx-auto p-4 shadow-xl">
      <h1>Create New Category</h1>
      <div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          type="text"
          className="w-full"
          value={input}
          onChange={handleChangeInput}
        />
        <Button
          variant="contained"
          className="w-full mt-4"
          onClick={onSubmit}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

export default CategoryCreate
