import React, { useContext } from "react"
import StateContext from "../StateContext.jsx"

function UserName(props) {
  const appState = useContext(StateContext)
  return (
    <div>
      {appState.arrays.leftColumn.forEach((element, index) => {
        if (props.request.userPermissionsLeft[index].value) {
          return (
            <>
              <label class="content roundCorner" for={props.request._id + element.name}>
                {element.value}
              </label>
              <br />
              <input id={props.request._id + element.name} class="content roundCorner shorterTextField" type="text" name={element.name} />
            </>
          )
        }
      })}
    </div>
  )
}

export default UserName
