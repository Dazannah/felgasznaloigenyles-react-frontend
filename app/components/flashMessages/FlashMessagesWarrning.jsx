import React, { useContext } from "react"
import StateContext from "../../StateContext.jsx"

function FlashMessagesWarning(props) {
  const appState = useContext(StateContext)

  function multipleMsg(msgs) {
    return (
      <div key={`waringInsideDiv`} className="alert alert-warning text-center floating-alert shadow-sm">
        {msgs.map(msg => {
          return (
            <>
              {msg}
              <br />
            </>
          )
        })}
      </div>
    )
  }

  function singleMsg(msg) {
    return (
      <div key={`waringInsideDiv`} className="alert alert-warning text-center floating-alert shadow-sm">
        {msg}
      </div>
    )
  }

  return (
    <div id="warning" className="floating-alerts">
      {appState.flashMessageWarrning.map(msg => {
        return Array.isArray(msg) ? multipleMsg(msg) : singleMsg(msg)
      })}
    </div>
  )
}

export default FlashMessagesWarning
