import React, { useContext, useEffect } from "react"
import DispatchContext from "../DispatchContext.jsx"

function FlashMessagesWarning(props) {

  return (
    <div id="warning" className="floating-alerts">
      {props.flashMessages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-warning text-center floating-alert shadow-sm">
          {msg}
          <br/>
        </div>
        )
      })}
    </div>
  )
}

export default FlashMessagesWarning
