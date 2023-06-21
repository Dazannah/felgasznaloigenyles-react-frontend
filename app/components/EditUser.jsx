import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"

import Page from "./Page.jsx"
import Loading from "./Loading.jsx"
import UpperFields from "./UpperFields.jsx"
import Columns from "./Columns.jsx"
import CreateNewTextarea from "./CreateNewTextarea.jsx"
import TechnicalTextarea from "./TechnicalTextarea.jsx"
import UserName from "./UserName.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function EditUser(props) {
  const appDispatch = useContext(DispatchContext)
  const initialState = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const { id } = useParams()

  useEffect(() => {
    async function getUser() {
      const result = await Axios.get(`/user/${id}/edit`, {
        headers: {
          authorization: `Bearer ${initialState.user.token}`
        }
      })

      setUser(result.data)
      appDispatch({ type: "setSiteLocation", value: `${result.data.personalInformations.name}` })
      setIsLoading(false)
    }

    getUser()
  }, [])

  if (isLoading)
    return (
      <Page title="Felhasználó módosítása">
        <Loading />
      </Page>
    )

  if (!user) {
    return <Page title="Felhasználó módosítása">Ez a felhasználó ID nem létetik.</Page>
  }
  return (
    <Page>
      <form>
        <UpperFields request={user} editUser={true} />

        <Columns request={user} editUser={true} />
        <CreateNewTextarea request={user} editUser={true} />
        <TechnicalTextarea request={user} editUser={true} />

        <UserName request={user} editUser={true} />
      </form>
    </Page>
  )
}

export default EditUser
