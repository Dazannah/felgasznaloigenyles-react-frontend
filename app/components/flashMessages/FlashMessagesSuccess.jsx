import React, { useContext } from "react"
import StateContext from "../../StateContext.jsx"

function FlashMessagesSuccess(props) {
  const appState = useContext(StateContext)

  return (
    <div id="warning" className="floating-alerts">
      {appState.flashMessageSuccess.map((msg, index) => {
        return (
          <div key={`waringInsideDiv${index}`} className="alert alert-success text-center floating-alert shadow-sm">
            {msg} <br />
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessagesSuccess
