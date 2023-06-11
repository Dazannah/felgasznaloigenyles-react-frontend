import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext.jsx"

function Classes(props) {
  const appState = useContext(StateContext)

  function handleClassClick(e) {
    props.setClassId(e.target.id)
    props.setClassName(e.target.innerHTML)
  }

  return (
    <>
      {appState.classes.map((element, index) => {
        return (
          <button className="btn classBtn" key={index} type="button" id={element._id} onClick={e => handleClassClick(e)}>
            {element.id ? `${element.id} | ${element.name}` : element.name}
          </button>
        )
      })}
    </>
  )
}

export default Classes
