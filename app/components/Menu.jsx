import React, { useEffect, useContext, useState } from "react"
import { Link, redirect, Navigate } from "react-router-dom"
import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"

function Menu() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [active, setActive] = useState()

  function setAcctiveBtn(e) {
    try {
      document.getElementById(active).classList.remove("activeMenuButton")
      setActive(e)
      document.getElementById(e).classList.add("activeMenuButton")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    try {
      const menuButtons = document.getElementsByTagName("a")
      let tmpActive

      for (let i = 0; i < menuButtons.length; i++) {
        if (menuButtons[i].href == window.location.href && menuButtons[i].id != "logOutBtn") {
          tmpActive = menuButtons[i].id
        }
      }
      setActive(tmpActive)
      document.getElementById(tmpActive).classList.add("activeMenuButton")
    } catch (err) {
      console.log(err)
    }
  }, [])

  function logout(e) {
    e.preventDefault()
    appDispatch({ type: "logout" })
  }

  return (
    <>
      <div key="title" id="title">
        <p>{`${appState.siteLocation}`}</p>
      </div>
      <div key="menuWrapper" id="menuWrapper">
        <div key="menu" id="menu">
          <form key="createNew">
            <Link id="createNewBtn" onClick={e => setAcctiveBtn(e.target.id)} key="createNewBtn" className="btn" to="/">
              Új felvétel
            </Link>
          </form>
          <form key="listUsers">
            <Link id="listUsersBtn" onClick={e => setAcctiveBtn(e.target.id)} key="listUsersBtn" className="btn" to="/list-users">
              Felhasználók listázása
            </Link>
          </form>
          <form key="listRequests">
            <Link id="listRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="listRequestsBtn" className="btn" to="/list-requests">
              Kérelmek listázása
            </Link>
          </form>
          <form key="allowedRequests">
            <Link id="allowedRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="allowedRequestsBtn" className="btn" to="/list-allowed-requests">
              Engedélyezett kérelmek listázása
            </Link>
          </form>
          <form key="completedRequests">
            <Link id="completedRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="completedRequestsBtn" className="btn" to="/list-completed-requests">
              Lezárt kérelmek
            </Link>
          </form>
          <form key="distributinList">
            <Link id="distributinListBtn" onClick={e => setAcctiveBtn(e.target.id)} key="distributinListBtn" className="btn" to="/asdasd">
              Terjesztési lista ígénylés
            </Link>
          </form>
        </div>

        <div key="logOutDiv" id="logOut">
          <form key="logOut">
            <Link id="logOutBtn" key="logOutBtn" className="btn" onClick={e => logout(e)} to="/">
              Kijelentkezés
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Menu
