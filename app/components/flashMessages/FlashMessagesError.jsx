import React, { useContext } from "react"
import StateContext from "../../StateContext.jsx"

function FlashMessagesError(props) {
  const appState = useContext(StateContext)

  return (
    <div id="warning" className="floating-alerts">
      {appState.flashMessageError.map((msg, index) => {
        return (
          <div key={`waringInsideDiv${index}`} className="alert alert-error text-center floating-alert shadow-sm">
            {msg} <br />
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessagesError
