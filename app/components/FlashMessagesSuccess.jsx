import React from "react"

function FlashMessagesSuccess(props) {
  if (props.flashMessages.length > 0) {
    return (
      <div id="warning" className="floating-alerts">
        <div key={"warningSuccess"} className="alert alert-success text-center floating-alert shadow-sm">
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

export default FlashMessagesSuccess
