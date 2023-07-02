import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import Axios from "axios"

Axios.defaults.baseURL = process.env.BACKENDURL

import { checkToken } from "./utils.jsx"

//components
import Login from "./components/Login.jsx"
import Menu from "./components/Menu.jsx"
import CreateNew from "./components/CreateNew.jsx"
import ListUsers from "./components/ListUsers.jsx"
import ListRequests from "./components/ListRequests.jsx"
import CompletedTickets from "./components/CompletedTickets.jsx"
import EditUser from "./components/EditUser.jsx"
import JumptToTop from "./components/JumptToTop.jsx"

//flash message
import FlashMessagesSuccess from "./components/FlashMessagesSuccess.jsx"
import FlashMessagesWarning from "./components/FlashMessagesWarrning.jsx"
import FlashMessagesError from "./components/FlashMessagesError.jsx"

import { showError } from "./utils.jsx"
import NoFound from "./components/NoFound.jsx"

//contexts
import StateContext from "./StateContext.jsx"
import DispatchContext from "./DispatchContext.jsx"
import FormStateContext from "./FormStateContext.jsx"
import FormDispatchContext from "./FormDispatchContext.jsx"
import AllowedRequests from "./components/AllowedRequests.jsx"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("jwt")),
    flashMessageSuccess: [],
    flashMessageError: [],
    flashMessageWarrning: [],
    flashMessageUsed: false,
    user: {
      token: localStorage.getItem("jwt")
    },
    siteLocation: "",
    arrays: JSON.parse(localStorage.getItem("arrays")),
    classes: JSON.parse(localStorage.getItem("classes"))
  }

  const formInitialState = {
    name: "",
    ticketId: "",
    isTechnical: false,
    technicalTextArea: "",
    classId: "",
    className: "",
    classLeader: "",
    workPost: "",
    workLocation: "",
    validFrom: "",
    validTo: "",
    createTextArea: "",
    process: "",
    permission: "",
    permissionId: "",
    userId: ""
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        return
      case "setJWT":
        draft.user.token = action.value
        return
      case "setSiteLocation":
        draft.siteLocation = action.value
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessageSuccess":
        draft.flashMessageSuccess.push(action.value)
        return
      case "flashMessageError":
        draft.flashMessageError.push(action.value)
        return
      case "flashMessageWarning":
        draft.flashMessageWarrning.push(action.value)
        return
      case "emptyflashMessageWarrning":
        draft.flashMessageWarrning = []
        return
      case "setArrays":
        draft.arrays = action.value
        return
      case "setClasses":
        draft.classes = action.value
        return
    }
  }

  function formReducer(draft, action) {
    switch (action.type) {
      case "setName":
        draft.name = action.value
        return
      case "setTicketId":
        draft.ticketId = action.value
        return
      case "setIsTechnical":
        draft.isTechnical = action.value
        return
      case "setTechnicalTextArea":
        draft.technicalTextArea = action.value
        return
      case "setClassId":
        draft.classId = action.value
        return
      case "setClassName":
        draft.className = action.value
        return
      case "setClassLeader":
        draft.classLeader = action.value
        return
      case "setWorkPost":
        draft.workPost = action.value
        return
      case "setWorkLocation":
        draft.workLocation = action.value
        return
      case "setValidFrom":
        draft.validFrom = action.value
        return
      case "setValidTo":
        draft.validTo = action.value
        return
      case "setCreateTextArea":
        draft.createTextArea = action.value
        return
      case "setProcess":
        draft.process = action.value
        return
      case "setPermission":
        draft.permission = action.value
        return
      case "setPermissionId":
        draft.permissionId = action.value
        return
      case "setUserId":
        draft.userId = action.value
        return
      case "reset":
        return formInitialState
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  const [formState, formDispatch] = useImmerReducer(formReducer, formInitialState)

  useEffect(() => {
    async function validateSession() {
      try {
        const result = await Axios.get("/validate-token", {
          headers: {
            authorization: `Bearer ${state.user.token}`
          }
        })
        checkToken(result.data, dispatch, "checkToken")
      } catch (err) {
        showError(err, dispatch)
        dispatch({ type: "logout" })
      }
    }
    validateSession()
  }, [state.loggedIn == true])

  useEffect(() => {
    async function getStartData() {
      try {
        const requests = await Axios.post("/get-data")
        localStorage.setItem(
          "arrays",
          JSON.stringify({
            leftColumn: requests.data[0].leftColumn,
            middleColumn: requests.data[0].middleColumn,
            rightColumn: requests.data[0].rightColumn,
            upperFields: requests.data[0].upperFields
          })
        )
        dispatch({
          type: "setArrays",
          value: {
            leftColumn: requests.data[0].leftColumn,
            middleColumn: requests.data[0].middleColumn,
            rightColumn: requests.data[0].rightColumn,
            upperFields: requests.data[0].upperFields
          }
        })

        localStorage.setItem("classes", JSON.stringify(requests.data[1]))

        dispatch({ type: "setClasses", value: requests.data[1] })
      } catch (err) {
        showError(err, dispatch)
      }
    }
    getStartData()
  }, [])

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("jwt", state.user.token)
    } else {
      localStorage.removeItem("jwt")
    }
  }, [state.loggedIn])

  if (state.loggedIn) {
    return (
      <FormStateContext.Provider value={formState}>
        <FormDispatchContext.Provider value={formDispatch}>
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
              <BrowserRouter>
                <FlashMessagesSuccess flashMessages={state.flashMessageSuccess} />
                <FlashMessagesError flashMessages={state.flashMessageError} />
                <FlashMessagesWarning flashMessages={state.flashMessageWarrning} />
                <Menu />
                <Routes>
                  <Route path="/" element={<CreateNew />} />
                  <Route path="/list-users" element={<ListUsers />}></Route>
                  <Route path="/list-requests" element={<ListRequests />} />
                  <Route path="/list-allowed-requests" element={<AllowedRequests />} />
                  <Route path="/list-completed-requests" element={<CompletedTickets />} />
                  <Route path="/user/:id/edit" element={<EditUser />} />
                  <Route path="/*" element={<NoFound />} />
                </Routes>
              </BrowserRouter>
              <JumptToTop />
            </DispatchContext.Provider>
          </StateContext.Provider>
        </FormDispatchContext.Provider>
      </FormStateContext.Provider>
    )
  } else {
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <FlashMessagesSuccess flashMessages={state.flashMessageSuccess} />
            <FlashMessagesError flashMessages={state.flashMessageError} />
            <FlashMessagesWarning flashMessages={state.flashMessageWarrning} />
            <Routes>
              <Route path="/*" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
