import React, { useContext } from "react"

function FlashMessagesError(props) {
  if (props.flashMessages.length > 0) {
    return (
      <div id="warning" className="floating-alerts">
        <div key={"warningError"} className="alert alert-error text-center floating-alert shadow-sm">
          {props.flashMessages.map((msg, index) => {
            console.log(msg, index)
            return (
              <>
                {msg} <br />
              </>
            )
          })}
        </div>
      </div>
    )
  }
}

export default FlashMessagesError
