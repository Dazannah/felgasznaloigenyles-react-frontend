import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext.jsx"
import FormDispatchContext from "../FormDispatchContext.jsx"

function Classes(props) {
  const appState = useContext(StateContext)
  const formDispatch = useContext(FormDispatchContext)

  function handleClassClick(e) {
    formDispatch({type: "setClassId", value: e.target.id})
    formDispatch({type: "setClassName", value: e.target.innerHTML})
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
