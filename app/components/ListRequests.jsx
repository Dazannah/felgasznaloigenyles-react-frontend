import React, { useEffect, useState } from "react"
import Loading from "./Loading.jsx"
import Axios from "axios"

function ListRequests(props) {
  const [isLoading, setIsLoading] = useState(true)

  async function getRequests() {
    try{
      const requests = await Axios.post("/requests-list-all",{
          token: localStorage.getItem("jwt")
      })
      console.log(requests)
      setIsLoading(false)
    }catch(err){
      console.log(err)
    }

  }
  getRequests()

  if (isLoading) return <Loading />

  return (
<></>
  )
}

export default ListRequests