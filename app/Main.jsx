import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"

import utils from "./utils.jsx"

Axios.defaults.baseURL = "http://localhost:3000"

//components
import Login from "./components/Login.jsx"
import Menu from "./components/Menu.jsx"
import CreateNew from "./components/CreateNew.jsx"
import ListUsers from "./components/ListUsers.jsx"
import ListRequests from "./components/ListRequests.jsx"

//flash message
import FlashMessagesSuccess from "./components/FlashMessagesSuccess.jsx"
import FlashMessagesWarning from "./components/FlashMessagesWarrning.jsx"
import FlashMessagesError from "./components/FlashMessagesError.jsx"

import NoFound from "./components/NoFound.jsx"

//contexts
import StateContext from "./StateContext.jsx"
import DispatchContext from "./DispatchContext.jsx"
import FormStateContext from "./FormStateContext.jsx"
import FormDispatchContext from "./FormDispatchContext.jsx"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("jwt")),
    flashMessagesSuccess: [],
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

  const formInitialState ={
    name: "",
    ticketId: "",
    classId: "",
    className: "",
    classLeader: "",
    workPost: "",
    workLocation: "",
    validFrom: "",
    validTo: "",
    createTextArea: "",
    process: ""
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
      case "flashMessagesSuccess":
        draft.flashMessagesSuccess.push(action.value)
        return
      case "flashMessageError":
        draft.flashMessageError.push(action.value)
        return
      case "flashMessageWarrning":
        draft.flashMessageWarrning.push(action.value)
        return
      case "emptyflashMessageWarrning":
        draft.flashMessageWarrning = []
        return
      case "setArrays":
        draft.arrays = action.value
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
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  const [formState, formDispatch] = useImmerReducer(formReducer, formInitialState)

  useEffect(() => {
    async function validateSession() {
      const result = await Axios.post("/validate-token", { token: localStorage.getItem("jwt") })
      utils(result.data, dispatch, "checkToken")
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
        localStorage.setItem("classes", JSON.stringify(requests.data[1]))
      } catch (err) {
        console.log(err)
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
                <FlashMessagesSuccess flashMessages={state.flashMessagesSuccess} />
                <FlashMessagesError flashMessages={state.flashMessageError} />
                <FlashMessagesWarning flashMessages={state.flashMessageWarrning} />
                <Menu />
                <Routes>
                  <Route path="/" element={<CreateNew />} />
                  <Route path="/list-users" element={<ListUsers />}></Route>
                  <Route path="/list-requests" element={<ListRequests />} />
                  <Route path="/*" element={<NoFound />} />
                </Routes>
              </BrowserRouter>
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
            <FlashMessagesSuccess flashMessages={state.flashMessagesSuccess} />
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
