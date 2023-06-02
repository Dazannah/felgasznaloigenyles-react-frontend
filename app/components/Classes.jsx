import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext.jsx"

function Classes(props) {
  const appState = useContext(StateContext)

  function setClass(e) {
    props.setClassId(e.target.id)
    props.setClassName(e.target.innerHTML)
  }

  return(
<>
    {
      appState.classes.map((element, index)=>{
      return (
          <button className="btn" key={index} type="button" id={element._id} onClick={e => setClass(e)}>
          {element.id} | {element.name}
        </button>
      )
    })
  }
  </>
)
}

export default Classes
