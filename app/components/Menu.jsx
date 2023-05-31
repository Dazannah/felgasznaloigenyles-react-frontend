import React, { useEffect, useContext, useState } from "react"
import { Link, redirect, Navigate } from "react-router-dom"
import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"

function Menu() {
  const appDispatch = useContext(DispatchContext)
  const appState = useState(StateContext)
  const [redirect, setRedirectTo] = useState(null)

  function logout(e) {
    e.preventDefault()
    appDispatch({ type: "logout" })
  }

  return (
    <>
      <div id="title">
        <p>{`${appState.location}`}</p>
      </div>
      <div id="menuWrapper">
        <div id="menu">
          <form>
            <Link className="btn" to="/">
              Új felvétel
            </Link>
          </form>
          <form>
            <Link className="btn" to="/list-users">
              Felhasználók listázása
            </Link>
          </form>
          <form>
            <Link className="btn" to="">
              Kérelmek listázása
            </Link>
          </form>
          <form>
            <Link className="btn" to="">
              Engedélyezett kérelmek listázása
            </Link>
          </form>
          <form>
            <Link className="btn" to="">
              Elkészült ticketek
            </Link>
          </form>
          <form>
            <Link className="btn" to="">
              Terjesztési lista ígénylés
            </Link>
          </form>
        </div>

        <div id="logOut">
          <form>
            <Link className="btn" onClick={e => logout(e)} to="/">
              Kijelentkezés
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Menu
