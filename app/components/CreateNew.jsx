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

import { checkToken, validateRequest, serializeDataToSend, generateState, showError } from "../utils.jsx"

function CreateNew() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const formState = useContext(FormStateContext)
  const formDispatch = useContext(FormDispatchContext)

  const formRef = useRef(null)

  useEffect(() => {
    formDispatch({ type: "reset" })
    formDispatch({ type: "setProcess", value: "Új felhasználó" })
  }, [])

  const statesLeftCollumn = generateState(appState.arrays.leftColumn)
  const statesMiddleCollumn = generateState(appState.arrays.middleColumn)
  const statesRightCollumn = generateState(appState.arrays.rightColumn)

  async function createNewUserRequest(event) {
    event.preventDefault()

    const errors = validateRequest(formState)
    if (errors) {
      appDispatch({ type: "flashMessageWarning", value: errors })
      window.scrollTo(0, 0)
    } else {
      const dataToSend = serializeDataToSend(formState, statesLeftCollumn, statesMiddleCollumn, statesRightCollumn)
      await handleSend(dataToSend)
    }
  }

  async function handleSend(dataToSend) {
    try {
      console.log(dataToSend)
      const result = await Axios.post("/create-new-ticket", {
        dataToSend,
        process: formState.process
      })

      const invalidToken = checkToken(result.data, appDispatch)

      if (invalidToken) {
        appDispatch({ type: "flashMessageWarning", value: "Érvénytelen bejelentkezés." })
        window.scrollTo(0, 0)
      } else if (result.data.errors) {
        appDispatch({ type: "flashMessageWarning", value: result.data.errors })
        window.scrollTo(0, 0)
      } else {
        appDispatch({ type: "flashMessageSuccess", value: "Kérelem mentése sikeres." })
        resetCollumnStates({ statesLeftCollumn, statesMiddleCollumn, statesRightCollumn })
        formDispatch({ type: "reset" })
        formRef.current.reset()
        window.scrollTo(0, 0)
      }
    } catch (err) {
      showError(err, appDispatch)
    }
  }

  function resetCollumnStates(collumnStates) {
    for (const collumn in collumnStates) {
      collumnStates[collumn].forEach(state => {
        state[1]({ name: state[0].name, value: false })
      })
    }
  }

  return (
    <Page title="Új létrehozás">
      <div className="create-form">
        <form onSubmit={createNewUserRequest} ref={formRef}>
          <UpperFields classChoosable={true} />
          <Columns leftStates={statesLeftCollumn} middleStates={statesMiddleCollumn} rightStates={statesRightCollumn} new={true}/>
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
