import React, { useEffect, useState } from "react"
import Page from "./Page.jsx"
import Loading from "./Loading.jsx"

function ListUsers() {
  const [isLoading, setIsLoading] = useState(true)

  function openUser() {
    setIsLoading(false)
  }

  if (isLoading)
    return (
      <Page title="Felhasználók listázása">
        <Loading />
      </Page>
    )

  return (
    <Page title="Felhasználók listázása">
      <div class="users">
        <button type="button" target="_blank" onClick={openUser} class="collapsible roundcorner">
          <strong>Név:</strong> <strong>Osztály:</strong> <strong>E-mail cím:</strong>{" "}
        </button>
      </div>
    </Page>
  )
}

export default ListUsers
