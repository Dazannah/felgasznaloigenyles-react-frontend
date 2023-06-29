import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import Page from "./Page.jsx"
import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"
import Loading from "./Loading.jsx"

function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [isLoading, setIsLoading] = useState(false)

  async function login(e) {
    e.preventDefault()
    appDispatch({ type: "emptyflashMessageWarrning" })
    setIsLoading(true)

    if (username != 0 || username != null || username != 0 || username != null) {
      try {
        const response = await Axios.post("/login", {
          username,
          password
        })

        if (response.data.token) {
          appDispatch({ type: "login" })
          appDispatch({ type: "setJWT", value: response.data.token })

          setIsLoading(false)
        } else {
          appDispatch({ type: "flashMessageWarning", value: response.data })
          setIsLoading(false)
        }
      } catch (err) {
        appDispatch({ type: "flashMessageError", value: err.message })
        setIsLoading(false)
      }
    } else {
      if (username == null || username == "") {
        appDispatch({ type: "flashMessageWarning", value: "Felhasználónév megadása kötelező." })
      }
      if (password == null || password == "") {
        appDispatch({ type: "flashMessageWarning", value: "Jelszó megadása kötelező." })
      }
      setIsLoading(false)
    }
  }

  return (
    <Page title="Bejelentkezés">
      <div id="login-wrapper">
        <div id="login-logo-wrapper">
          {" "}
          <img id="login-logo" src="/imgs/logo.png" alt="" />
        </div>

        <div id="login-title">
          <h1>Jogosultság igénylő</h1>
        </div>
        <div id="login-form-wrapper">
          <form className="login-form" onSubmit={e => login(e)}>
            <label htmlFor="userName" className="hidden-lable">
              Felhasználónév:
            </label>
            <input className="login-input round-corner" onChange={e => setUsername(e.target.value)} type="text" placeholder="Felhasználónév" id="userName" name="userName" autoComplete="off" required />

            <label htmlFor="password" className="hidden-lable">
              Jelszó:
            </label>
            <input className="login-input round-corner" onChange={e => setPassword(e.target.value)} type="password" placeholder="Jelszó" id="password" name="password" autoComplete="off" required />

            <input type="hidden" name="csrf-token" value="" />
            <div id="login-button-wrapper">{isLoading ? <Loading /> : <input id="login-button" className="round-corner" type="submit" value="Bejelentkezés" />}</div>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default Login
