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
    appDispatch({type: "emptyflashMessageWarrning"})
    setIsLoading(true)

    if ((username != 0 || username != null) || (username != 0 || username != null)) {
      try {
        const response = await Axios.post("/login", {
          username,
          password
        })

        if (response.data.token) {
          appDispatch({ type: "login" })
          appDispatch({ type: "setJWT", value: response.data.token})

          setIsLoading(false)
        } else {
          appDispatch({ type: "flashMessageWarrning", value: response.data})
          setIsLoading(false)
        }
      } catch (err) {
        appDispatch({ type: "flashMessageError", value: err.message })
        setIsLoading(false)
      }
    } else {
      if (username == null || username == "") {
        appDispatch({ type: "flashMessageWarrning", value: "Felhasználónév megadása kötelező." })
      }
      if (password == null || password == "") {
        appDispatch({ type: "flashMessageWarrning", value: "Jelszó megadása kötelező." })
      }
      setIsLoading(false)
    }

  }

  return (
    <Page title="Bejelentkezés">
      <div id="title">
        <p>Jogosultság igénylés</p>
      </div>
      <div id="title2">
        Hódmezővásárhelyi - Makói Egészségügyi Ellátó Központ
        <br />
      </div>
      <br />
      <div id="login">
        <form onSubmit={e => login(e)}>
          <label htmlFor="userName">Felhasználónév:</label>
          <br />
          <input onChange={e => setUsername(e.target.value)} type="text" id="userName" name="userName" autoComplete="off" />
          <br />
          <br />
          <label htmlFor="password">Jelszó:</label>
          <br />
          <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" autoComplete="off" />
          <br />
          <br />
          <input type="hidden" name="csrf-token" value="" />
          {isLoading ? <Loading /> : <input className="button" type="submit" value="Bejelentkezés" />}
          <br />
          <br />
        </form>
      </div>
      <br />
    </Page>
  )
}

export default Login
