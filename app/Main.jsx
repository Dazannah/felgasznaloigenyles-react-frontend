import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:3000"

//components
import Login from "./components/Login.jsx"
import Menu from "./components/Menu.jsx"
import CreateNew from "./components/CreateNew.jsx"
import ListUsers from "./components/ListUsers.jsx"
import FlashMessagesSuccess from "./components/FlashMessagesSuccess.jsx"
import FlashMessagesWarning from "./components/FlashMessagesWarrning.jsx"
import FlashMessagesError from "./components/FlashMessagesError.jsx"

import NoFound from "./components/NoFound.jsx"

//contexts
import StateContext from "./StateContext.jsx"
import DispatchContext from "./DispatchContext.jsx"

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
    location: "Jogosultság igénylés"
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
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
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("jwt", state.user.token)
    } else {
      localStorage.removeItem("jwt")
    }
  }, [state.loggedIn])

  if (state.loggedIn) {
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <FlashMessagesSuccess flashMessages={state.flashMessagesSuccess} />
            <FlashMessagesError flashMessages={state.flashMessageError} />
            <FlashMessagesWarning flashMessages={state.flashMessageWarrning} flashMessageUsed={state.flashMessageUsed}/>
            <Menu />
            <Routes>
              <Route path="/" element={<CreateNew />} />
              <Route path="/list-users" element={<ListUsers />}></Route>

              <Route path="/*" element={<NoFound />} />
            </Routes>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
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
