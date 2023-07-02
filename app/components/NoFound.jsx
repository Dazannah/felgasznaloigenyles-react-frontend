import React, { useEffect } from "react"
import Page from "./Page.jsx"

function NoFound(props) {
  return (
    <Page title="404, az oldal nem található">
      {" "}
      <div className="no-request-div">
        <span className="no-request-span">Az oldal nem található.</span>
      </div>
    </Page>
  )
}

export default NoFound
