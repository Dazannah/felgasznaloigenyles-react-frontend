import React, { useContext } from "react"
import StateContext from "../StateContext.jsx"

function UserName(props) {
  const appState = useContext(StateContext)
  return (
    <div>
      {appState.arrays.leftColumn.map((element, index) => {
        if (props.request.userPermissionsLeft[index].value) {
          return (
            <>
            <br />
              <label className="content roundCorner" htmlFor={props.request._id + element.name}>
                {element.value}
              </label>
              <br />
              <input id={props.request._id + element.name} className="content roundCorner shorterTextField" type="text" name={element.name} />
            </>
          )
        }
      })}
    </div>
  )
}

export default UserName
