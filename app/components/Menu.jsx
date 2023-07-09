import React, { useEffect, useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"

function Menu() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [active, setActive] = useState()

  function setAcctiveBtn(e) {
    if (active) {
      document.getElementById(active).classList.remove("active-main-menu-btn")
      setActive(e)
      document.getElementById(e).classList.add("active-main-menu-btn")
    } else {
      setActive(e)
      document.getElementById(e).classList.add("active-main-menu-btn")
    }
  }

  useEffect(() => {
    const menuButtons = document.getElementsByTagName("a")
    let tmpActive

    for (let i = 0; i < menuButtons.length; i++) {
      if (menuButtons[i].href == window.location.href && menuButtons[i].id != "logOutBtn") {
        tmpActive = menuButtons[i].id
      }
    }

    setActive(tmpActive)
    if (tmpActive) {
      document.getElementById(tmpActive).classList.add("active-main-menu-btn")
    }
  }, [])

  function logout(e) {
    e.preventDefault()
    appDispatch({ type: "emptyflashMessageWarrning" })
    appDispatch({ type: "logout" })
  }

  return (
    <>
      <nav key="menu" id="main-menu">
        <div className="main-content-wrapper">
          <ul className="group">
            <li>
              {" "}
              <Link id="createNewBtn" onClick={e => setAcctiveBtn(e.target.id)} key="createNewBtn" to="/">
                Új felvétel
              </Link>
            </li>
            <li>
              {" "}
              <Link id="listUsersBtn" onClick={e => setAcctiveBtn(e.target.id)} key="listUsersBtn" to="/list-users">
                Felhasználók listázása
              </Link>
            </li>
            <li>
              {" "}
              <Link id="listRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="listRequestsBtn" to="/list-requests">
                Kérelmek listázása
              </Link>
            </li>
            <li>
              {" "}
              <Link id="allowedRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="allowedRequestsBtn" to="/list-allowed-requests">
                Engedélyezett kérelmek listázása
              </Link>
            </li>
            <li>
              {" "}
              <Link id="completedRequestsBtn" onClick={e => setAcctiveBtn(e.target.id)} key="completedRequestsBtn" to="/list-completed-requests">
                Lezárt kérelmek
              </Link>
            </li>
            <li>
              {" "}
              <Link id="distributinListBtn" onClick={e => setAcctiveBtn(e.target.id)} key="distributinListBtn" to="/create-distribution-list">
                Terjesztési lista igénylés
              </Link>
            </li>
            <li>
              {" "}
              <Link id="logOutBtn" key="logOutBtn" onClick={e => logout(e)} to="/">
                Kijelentkezés
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Menu
