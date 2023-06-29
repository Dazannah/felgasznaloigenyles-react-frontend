import React, { useContext, useEffect } from "react"

function FlashMessagesWarning(props) {
  if (props.flashMessages.length > 0) {
    return (
      <div id="warning" className="floating-alerts">
        <div key={"waringInsideDiv"} className="alert alert-warning text-center floating-alert shadow-sm">
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

export default FlashMessagesWarning
