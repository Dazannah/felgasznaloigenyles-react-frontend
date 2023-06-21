import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"

import Page from "./Page.jsx"
import Loading from "./Loading.jsx"

import StateContext from "../StateContext.jsx"
function EditUser(props) {
  const initialState = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    async function getUser() {
      const result = await Axios.get(`/user/${id}/edit`, {
        headers: {
          authorization: `Bearer ${initialState.user.token}`
        }
      })
      console.log(result)
      //setUser(result)
      //setIsLoading(false)
    }

    getUser()
  }, [])

  if (isLoading)
    return (
      <Page title="Felhasználó jogosultság módosítása">
        <Loading />
      </Page>
    )

  if (!user) {
    return <Page title="Felhasználó jogosultság módosítása">Ez a felhasználó ID nem létetik.</Page>
  }
  return (
    <Page title="Felhasználók listázása">
      <form>
        <UpperFields request={request} setUserId={setUserId} />

        <Columns request={request} />
        <CreateNewTextarea request={request} />
        <TechnicalTextarea request={request} />

        <UserName request={request} />
      </form>
    </Page>
  )
}

export default EditUser
