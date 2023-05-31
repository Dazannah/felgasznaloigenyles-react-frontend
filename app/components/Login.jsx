import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import DispatchContext from "../DispatchContext.jsx"

function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function login(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/login", {
        username,
        password
      })

      if (response.data.token) {
        localStorage.setItem("jwt",`${response.data.token}`)
        appDispatch({ type: "login"})
      } else {
        console.log(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
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
          <input onChange={e => setUsername(e.target.value)} type="text" id="userName" name="userName" autoComplete="off"/>
          <br />
          <br />
          <label htmlFor="password">Jelszó:</label>
          <br />
          <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" autoComplete="off"/>
          <br />
          <br />
          <input type="hidden" name="csrf-token" value="" />
          <input className="button" type="submit" value="Bejelentkezés" />
          <br />
          <br />
        </form>
      </div>
      <br />
    </>
  )
}

export default Login
