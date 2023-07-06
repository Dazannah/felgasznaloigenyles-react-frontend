import React, { useContext } from "react"
import StateContext from "../../StateContext.jsx"

function FlashMessagesWarning(props) {
  const appState = useContext(StateContext)

  return (
    <div id="warning" className="floating-alerts">
      {appState.flashMessageWarrning.map((msg, index) => {
        return (
          <div key={`waringInsideDiv${index}`} className="alert alert-warning text-center floating-alert shadow-sm">
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessagesWarning
