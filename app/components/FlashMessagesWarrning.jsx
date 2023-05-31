import React, { useContext } from "react"
import DispatchContext from "../DispatchContext.jsx"

function FlashMessagesWarning(props) {
  const appDispatch = useContext(DispatchContext)
  return (
    <div className="floating-alerts">
      {props.flashMessages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-warning text-center floating-alert shadow-sm">
            {msg}
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessagesWarning
