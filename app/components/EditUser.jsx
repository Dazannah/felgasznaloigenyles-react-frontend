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

import { serializeDataToSend, generateState } from "../utils.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"
import FormDispatchContext from "../FormDispatchContext.jsx"
import FormStateContext from "../FormStateContext.jsx"

function EditUser(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const initialState = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const { id } = useParams()

  const formState = useContext(FormStateContext)
  const formDispatch = useContext(FormDispatchContext)

  useEffect(() => {
    async function getUser() {
      const result = await Axios.get(`/user/${id}/edit`, {
        headers: {
          authorization: `Bearer ${initialState.user.token}`
        }
      })

      if (result.data && Object.keys(result.data).length > 0) {
        setUser(result.data)
        appDispatch({ type: "setSiteLocation", value: `${result.data.personalInformations.name}` })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }

    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      statesLeftCollumn.forEach((element, index) => {
        if (user.userPermissionsLeft[index].name === element[0].name) {
          statesLeftCollumn[index][1]({ name: element[0].name, value: user.userPermissionsLeft[index].value })
        }
      })
      statesMiddleCollumn.forEach((element, index) => {
        if (user.userPermissionsMiddle[index].name === element[0].name) {
          statesMiddleCollumn[index][1]({ name: element[0].name, value: user.userPermissionsMiddle[index].value })
        }
      })
      statesRightCollumn.forEach((element, index) => {
        if (user.userPermissionsRight[index].name === element[0].name) {
          statesRightCollumn[index][1]({ name: element[0].name, value: user.userPermissionsRight[index].value })
        }
      })
    }
  }, [user])

  useEffect(() => {
    formDispatch({ type: "setProcess", value: "Felhasználó módosítása" })
  }, [])

  const statesLeftCollumn = generateState(appState.arrays.leftColumn)
  const statesMiddleCollumn = generateState(appState.arrays.middleColumn)
  const statesRightCollumn = generateState(appState.arrays.rightColumn)

  const formRef = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries())

    const dataToSend = serializeDataToSend(formState, statesLeftCollumn, statesMiddleCollumn, statesRightCollumn) //userNames-t bele tenni
    dataToSend.userId = user._id
    dataToSend.userNames = {}

    for (const property in values) {
      appState.arrays.leftColumn.forEach(element => {
        if (element.name === property) {
          dataToSend.userNames[property] = values[property]
        }
      })
    }

    try {
      const response = await Axios.post(
        `/user/${id}/edit`,
        {
          dataToSend,
          process: formState.process
        },
        {
          headers: {
            authorization: `Bearer ${initialState.user.token}`
          }
        }
      )

      if (response.data.acknowledged) {
        appDispatch({ type: "flashMessageSuccess", value: "Módosítási igény sikeresen mentve" })
        scroll(0, 0)
      } else if (response.data.errors) {
        appDispatch({ type: "flashMessageWarning", value: response.data.errors })
      } else {
        appDispatch({ type: "flashMessageWarning", value: `Valami hiba történt: ${response.data}` })
        scroll(0, 0)
      }
    } catch (err) {
      appDispatch({ type: "flashMessageWarning", value: `${err}` })
      scroll(0, 0)
    }
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
        <form id="editForm" onSubmit={handleSubmit} ref={formRef}>
          <UpperFields request={user} classChoosable={true} listOut={true} />
          <Columns leftStates={statesLeftCollumn} middleStates={statesMiddleCollumn} rightStates={statesRightCollumn} request={user} />
          <CreateNewTextarea request={user} />
          <TechnicalTextarea request={user} />

          <UserName request={user} />
          <CreateNewTextarea listOut={false} />
          {formState.isTechnical ? <TechnicalTextarea /> : ""}
          <input type="hidden" name="userId" value={user._id} />
          <input type="hidden" name="csrf-token" value="" />
          <input type="submit" className="form-submit-input round-corner" value="Küldés" />
        </form>
      </div>
    </Page>
  )
}

export default EditUser
