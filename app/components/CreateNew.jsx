import React, { useEffect, useState, useContext, useRef } from "react"
import Page from "./Page.jsx"
import Columns from "./Columns.jsx"
import Loading from "./Loading.jsx"
import Axios from "axios"
import utils from "../utils.jsx"

import CreateNewTextarea from "./CreateNewTextarea.jsx"
import UpperFields from "./UpperFields.jsx"
import TechnicalTextarea from "./TechnicalTextarea.jsx"

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"
import FormDispatchContext from "../FormDispatchContext.jsx"
import FormStateContext from "../FormStateContext.jsx"

function CreateNew() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const formState = useContext(FormStateContext)
  const formDispatch = useContext(FormDispatchContext)

  const formRef = useRef(null)

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

  function getUserPermissions(permissionsArray) {
    let resultPermissionArray = []
    permissionsArray.forEach((element, index) => {
      resultPermissionArray[index] = element[0]
    })
    return resultPermissionArray
  }

  async function createNewUserRequest(event) {
    event.preventDefault()
    const errors = validateRequest()
    if (errors) {
      appDispatch({ type: "flashMessageWarning", value: errors })
      window.scrollTo(0, 0)
    } else {
      const dataToSend = serializeDataToSend()
      handleSend(dataToSend)
    }
  }

  function validateRequest() {
    let errors = []

    if (!formState.name) errors.push("Név megadása kötelező.")
    if (!formState.classId) errors.push("Osztály megadása kötelező.")
    if (!formState.classLeader) errors.push("Osztályvezető megadása kötelező.")
    if (!formState.workPost) errors.push("Beosztás megadása kötelező.")
    if (!formState.workLocation) errors.push("Munkavégzés hely megadása kötelező.")
    if (formState.isTechnical) {
      if (formState.validTo == "") {
        errors.push("Technikai fiók esetében érvényesség vége megadása kötelező.")
      }
    }

    if (errors.length != 0) return errors
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

  async function handleSend(dataToSend) {
    try {
      const result = await Axios.post(
        "/create-new-ticket",
        {
          dataToSend,
          process: formState.process
        },
        {
          headers: {
            authorization: `Bearer ${appState.user.token}`
          }
        }
      )
      console.log(result)
      const invalidToken = utils(result.data, appDispatch, "checkToken")

      if (invalidToken) {
        appDispatch({ type: "flashMessageWarning", value: "Érvénytelen bejelentkezés." })
        window.scrollTo(0, 0)
      } else if (result.data.errors) {
        appDispatch({ type: "flashMessageWarning", value: result.data.errors })
        window.scrollTo(0, 0)
      } else {
        formRef.current.reset()
        appDispatch({ type: "flashMessagesSuccess", value: "Kérelem mentése sikeres." })
        formDispatch({ type: "setClassName", value: "" })
        window.scrollTo(0, 0)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Page title="Új létrehozás">
      <form id="createForm" onSubmit={createNewUserRequest} ref={formRef}>
        <UpperFields />
        <Columns leftStates={statesLeftCollumn} middleStates={statesMiddleCollumn} rightStates={statesRightCollumn} />
        <CreateNewTextarea listOut={false} />
        {formState.isTechnical ? <TechnicalTextarea /> : ""}
        <input type="hidden" name="csrf-token" value="" />
        <input type="submit" className="button" value="Küldés" />
      </form>
    </Page>
  )
}

export default CreateNew
