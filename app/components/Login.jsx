import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import Page from "./Page.jsx"
import DispatchContext from "../DispatchContext.jsx"
import Loading from "./Loading.jsx"

function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [isLoading, setIsLoading] = useState(false)

  async function login(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await Axios.post("/login", {
        username,
        password
      })

      if (response.data.token) {
        appDispatch({ type: "login" })
        setIsLoading(false)
      } else {
        console.log(response.data)
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err.message)
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
