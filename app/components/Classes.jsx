import React, { useEffect } from "react"

function Classes(props) {
  function setClass(e) {
    props.setClassId(e.target.id)
  }
  return (
    <button type="button" id="<%= element._id %>" onClick={e => setClass(e)}>
      className
    </button>
  )
}

export default Classes
