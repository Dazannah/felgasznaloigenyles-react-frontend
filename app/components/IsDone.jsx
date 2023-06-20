import React, { useEffect } from "react"

function IsDone(props) {
  return (
    <>
      <input {...(props.listOut ? { disabled: true, checked: props.request.isCompleted } : "")} id={props.request._id + "inputId"} key={props.request._id + "inputKey"} type="checkbox" name="done" value={true} />
      <label key={props.request._id + "lableKey"} htmlFor={props.request._id + "inputId"}>
        Elkészítve
      </label>

      <br />
      <br />
    </>
  )
}

export default IsDone
