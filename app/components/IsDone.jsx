import React, { useEffect } from "react"

function IsDone(props) {
  return (
    <>
      <input id={props.request._id + "inputId"} key={props.request._id + "inputKey"} type="checkbox" name="done" value={true} />
      <label key={props.request._id + "lableKey"} htmlFor={props.request._id + "inputId"}>
        Elkészítve
      </label>

      <br />
      <br />
    </>
  )
}

export default IsDone
