import React from "react"

function FlashMessagesError(props) {
  return (
    <div className="floating-alerts">
      {props.flashMessages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-error text-center floating-alert shadow-sm">
            {msg} <br />
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessagesError
