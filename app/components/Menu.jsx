import React, { useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import DispatchContext from "../DispatchContext.jsx"

function Menu() {
  const appDispatch = useContext(DispatchContext)

  function logout(e){
    e.preventDefault()
    localStorage.removeItem("jwt")
    appDispatch({type: "logout"})
  }

  return (
    <div id="menuWrapper">
      <div id="menu">
        <form>
          <button onClick={useNavigate("/")}>Új felvétel</button>
        </form>
        <form>
          <button onClick={useNavigate("/list-users")}>Felhasználók listázása</button>
        </form>
        <form>
          <button onClick={useNavigate()} >Kérelmek listázása</button>
        </form>
        <form>
          <button onClick={useNavigate()} >Engedélyezett kérelmek listázása</button>
        </form>
        <form>
          <button onClick={useNavigate()} >Elkészült ticketek</button>
        </form>
        <form>
          <button onClick={useNavigate()} >Terjesztési lista ígénylés</button>
        </form>
      </div>

      <div id="logOut">

          <button onClick={e => logout(e)} >Kijelentkezés</button>

      </div>
    </div>
  )
}

export default Menu
