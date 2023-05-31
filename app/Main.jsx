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

//contexts
import StateContext from "./StateContext.jsx"
import DispatchContext from "./DispatchContext.jsx"

function Main() {
  const initialState = {
    loggedIn: false,
    flashMessages: [],
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        return
      case "logout":
        draft.loggedIn = false
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  const appDispatch = useContext(DispatchContext)

  console.log(Boolean(window.localStorage.getItem("jwt")))
  if(Boolean(window.localStorage.getItem("jwt"))){ //valami ilyet kellene reactosan megcsinálni
    () => appDispatch({ type: "login"})
  }else{
    () => appDispatch({ type: "logout"})
  }

  if (state.loggedIn) {
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route path="/" element={<CreateNew />} />
              <Route path="/list-users" element={<ListUsers />}></Route>
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
            <Routes>
              <Route path="/" element={<Login />} />
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
