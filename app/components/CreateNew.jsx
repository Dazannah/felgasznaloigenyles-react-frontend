import React, { useEffect, useState, useContext, useRef } from "react"
import Page from "./Page.jsx"
import Columns from "./Columns.jsx"
import Loading from "./Loading.jsx"
import Axios from "axios"

import CreateNewTextarea from "./CreateNewTextarea.jsx"
import UpperFields from "./UpperFields.jsx"
import TechnicalTextarea from "./TechnicalTextarea.jsx"

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"
import FormDispatchContext from "../FormDispatchContext.jsx"
import FormStateContext from "../FormStateContext.jsx"

import { checkToken, validateRequest, serializeDataToSend, generateState } from "../utils.jsx"

function CreateNew() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const formState = useContext(FormStateContext)
  const formDispatch = useContext(FormDispatchContext)

  const formRef = useRef(null)

  useEffect(() => {
    formDispatch({ type: "setProcess", value: "Új felhasználó" })
  }, [])

  const statesLeftCollumn = generateState(appState.arrays.leftColumn)
  const statesMiddleCollumn = generateState(appState.arrays.middleColumn)
  const statesRightCollumn = generateState(appState.arrays.rightColumn)

  async function createNewUserRequest(event) {
    event.preventDefault()
    const errors = validateRequest(formState)
    if (errors) {
      console.log(errors)
      appDispatch({ type: "flashMessageWarning", value: errors })
      window.scrollTo(0, 0)
    } else {
      const dataToSend = serializeDataToSend(formState, statesLeftCollumn, statesMiddleCollumn, statesRightCollumn)
      handleSend(dataToSend)
    }
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
      const invalidToken = checkToken(result.data, appDispatch)

      if (invalidToken) {
        appDispatch({ type: "flashMessageWarning", value: "Érvénytelen bejelentkezés." })
        window.scrollTo(0, 0)
      } else if (result.data.errors) {
        appDispatch({ type: "flashMessageWarning", value: "Valami hiba történt." })
        window.scrollTo(0, 0)
      } else {
        formRef.current.reset()
        appDispatch({ type: "flashMessageSuccess", value: "Kérelem mentése sikeres." })
        formDispatch({ type: "setClassName", value: "" })
        window.scrollTo(0, 0)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Page title="Új létrehozás">
      <div className="create-form">
        <form onSubmit={createNewUserRequest} ref={formRef}>
          <UpperFields classChoosable={true} />
          <Columns leftStates={statesLeftCollumn} middleStates={statesMiddleCollumn} rightStates={statesRightCollumn} />
          <CreateNewTextarea listOut={false} />
          {formState.isTechnical ? <TechnicalTextarea /> : ""}
          <input className="" type="hidden" name="csrf-token" value="" />
          <input type="submit" className="form-submit-input round-corner" value="Küldés" />
        </form>
      </div>
    </Page>
  )
}

export default CreateNew
