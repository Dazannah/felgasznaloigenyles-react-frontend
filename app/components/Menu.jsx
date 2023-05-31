import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function Menu() {
  return (
    <div id="menuWrapper">
      <div id="menu">
        <form>
          <button onClick={() => useNavigate("/")}>Új felvétel</button>
        </form>
        <form>
          <button onClick={() => useNavigate("/listUsers")}>Felhasználók listázása</button>
        </form>
        <form onSubmit="/requestsList">
          <input type="submit" value="Kérelmek listázása" />
        </form>
        <form onSubmit="/requestsHandle">
          <input type="submit" value="Engedélyezett kérelmek listázása" />
        </form>
        <form onSubmit="/requestClosed">
          <input type="submit" value="Elkészült ticketek" />
        </form>
        <form onSubmit="/distributionList">
          <input type="submit" value="Terjesztési lista ígénylés" />
        </form>
      </div>

      <div id="logOut">
        <form onSubmit="/logOut" method="post">
          <input type="hidden" name="csrf-token" value="" />
          <input type="submit" value="Kijelentkezés" />
        </form>
      </div>
    </div>
  )
}

export default Menu
