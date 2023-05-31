import React from "react"

function FlashMessagesSuccess(props) {
  return (
    <div className="floating-alerts">
      {props.flashMessages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
            {msg}
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessagesSuccess
