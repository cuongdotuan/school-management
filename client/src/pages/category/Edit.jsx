import { Button, Input, TextField } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api"
import { UserContext } from "../../context"

const CategoryEdit = () => {
  const [detail, setDetail] = useState(null)
  const data = useParams()
  const { setIsLoading } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    const getDetail = async () => {
      const res = await api.get(`/categories/${data.id}`)
      setDetail(res.data)
    }
    getDetail()
  }, [])

  const handleChangeInput = (e) => {
    setDetail({ ...detail, name: e.target.value })
  }
  const onSubmit = () => {
    setIsLoading(true)
    const putUpdate = async () => {
      try {
        await api.put(`/categories/${data.id}`, detail)
        navigate(`/category`)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    putUpdate()
  }
  return (
    <div className="w-96 mx-auto p-4 shadow-xl">
      <div>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          className="w-full"
          value={detail?.name || ""}
          onChange={handleChangeInput}
        />

        <Button
          variant="contained"
          className="w-full mt-4"
          onClick={onSubmit}
        >
          Change
        </Button>
      </div>
    </div>
  )
}

export default CategoryEdit
