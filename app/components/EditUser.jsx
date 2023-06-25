import React, { useEffect, useState, useContext, useRef } from "react"
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
import FormDispatchContext from "../FormDispatchContext.jsx"
import FormStateContext from "../FormStateContext.jsx"

function EditUser(props) {
  const appDispatch = useContext(DispatchContext)
  const initialState = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const { id } = useParams()

  const formState = useContext(FormStateContext)
  const formDispatch = useContext(FormDispatchContext)

  const formRef = useRef(null)

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

  async function editUser(event) {
    event.preventDefault()
  }

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
      <div className="create-form">
        <form id="editForm" onSubmit={editUser} ref={formRef}>
          <UpperFields request={user} classChoosable={true} listOut={true} />
          <Columns request={user} />
          <CreateNewTextarea request={user} />
          <TechnicalTextarea request={user} />

          <UserName request={user} />
          {formState.isTechnical ? <TechnicalTextarea /> : ""}
          <input type="hidden" name="csrf-token" value="" />
          <input type="submit" className="form-submit-input round-corner" value="Küldés" />
        </form>
      </div>
    </Page>
  )
}

export default EditUser
