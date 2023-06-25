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
      document.getElementById(active).classList.remove("active-main-menu-btn")
      setActive(e)
      document.getElementById(e).classList.add("active-main-menu-btn")
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
      document.getElementById(tmpActive).classList.add("active-main-menu-btn")
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
      <div key="menuWrapper" id="menu-wrapper">
        <nav key="menu" id="main-menu">
          <ul className="group">
            <li>
              {" "}
              <Link id="createNewBtn" onClick={e => setAcctiveBtn(e.target.id)} key="createNewBtn" className="menu-btn" to="/">
                Új felvétel
              </Link>
            </li>
            <li>
              {" "}
              <Link id="listUsersBtn" onClick={e => setAcctiveBtn(e.target.id)} key="listUsersBtn" className="menu-btn" to="/list-users">
                Felhasználók listázása
              </Link>
            </li>
            <li>
              {" "}
              <Link id="listRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="listRequestsBtn" className="menu-btn" to="/list-requests">
                Kérelmek listázása
              </Link>
            </li>
            <li>
              {" "}
              <Link id="allowedRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="allowedRequestsBtn" className="menu-btn" to="/list-allowed-requests">
                Engedélyezett kérelmek listázása
              </Link>
            </li>
            <li>
              {" "}
              <Link id="completedRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="completedRequestsBtn" className="menu-btn" to="/list-completed-requests">
                Lezárt kérelmek
              </Link>
            </li>
            <li>
              {" "}
              <Link id="distributinListBtn" onClick={e => setAcctiveBtn(e.target.id)} key="distributinListBtn" className="menu-btn" to="/asdasd">
                Terjesztési lista ígénylés
              </Link>
            </li>
            <li>
              {" "}
              <Link id="logOutBtn" key="logOutBtn" className="menu-btn" onClick={e => logout(e)} to="/">
                Kijelentkezés
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div key="title" id="title">
        <p>{`${appState.siteLocation}`}</p>
      </div>
    </>
  )
}

export default Menu
