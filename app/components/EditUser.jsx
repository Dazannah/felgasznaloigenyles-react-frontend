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

      setUser(result.data)
      appDispatch({ type: "setSiteLocation", value: `${result.data.personalInformations.name}` })
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

  function generateState(array) {
    let statesArray = []
    let counter = 0

    array.forEach(element => {
      let temp = element.id
      let temp2 = "set" + element.id
      statesArray[counter] = [temp, temp2] = useState({ name: element.id, value: false })
      counter++
    })

    return statesArray
  }

  useEffect(() => {
    formDispatch({ type: "setProcess", value: "Új felhasználó" })
  }, [])

  const statesLeftCollumn = generateState(appState.arrays.leftColumn)
  const statesMiddleCollumn = generateState(appState.arrays.middleColumn)
  const statesRightCollumn = generateState(appState.arrays.rightColumn)

  const formRef = useRef(null)

  function getUserPermissions(permissionsArray) {
    let resultPermissionArray = []
    permissionsArray.forEach((element, index) => {
      resultPermissionArray[index] = element[0]
    })
    return resultPermissionArray
  }

  function serializeDataToSend() {
    const personalInformations = {
      name: formState.name,
      classId: formState.classId,
      className: formState.className,
      ticketId: formState.ticketId,
      classLeader: formState.classLeader,
      workPost: formState.workPost,
      workLocation: formState.workLocation,
      validFrom: formState.validFrom,
      validTo: formState.validTo
    }
    const userPermissionsLeft = getUserPermissions(statesLeftCollumn)
    const userPermissionsMiddle = getUserPermissions(statesMiddleCollumn)
    const userPermissionsRight = getUserPermissions(statesRightCollumn)

    const dataToSend = {
      personalInformations,
      userPermissionsLeft,
      userPermissionsMiddle,
      userPermissionsRight,
      createTextArea: formState.createTextArea,
      technical: {
        isTechnical: formState.isTechnical,
        technicalTextArea: formState.technicalTextArea
      }
    }

    return dataToSend
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formValues = Object.fromEntries(formData.entries())
    const dataToSend = serializeDataToSend()
    console.log(formValues)
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
          <input type="hidden" name="csrf-token" value="" />
          <input type="submit" className="form-submit-input round-corner" value="Küldés" />
        </form>
      </div>
    </Page>
  )
}

export default EditUser
