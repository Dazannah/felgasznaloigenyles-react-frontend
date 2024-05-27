import React, { useContext } from "react"
import StateContext from "../StateContext.jsx"

function UserName(props) {
  const appState = useContext(StateContext)
  let index = 0
  return (
    <div key={props.request._id + "usernameDiv"}>
      {appState.arrays.leftColumn.map((element) => {
        if (props.request.userPermissionsLeft[index].name == element.name && props.request.userPermissionsLeft[index].value) {
          index++
          return (
            <div key={props.request._id + element.name + "containerDiv"}>
              <br key={props.request._id + element.name + "br1"} />
              <label key={props.request._id + element.name + "label"} className="content roundCorner" htmlFor={props.request._id + element.name}>
                {element.name === "eMail" ? element.value + "ek (szóközzel elválasztva)" : element.value}
              </label>
              <br key={props.request._id + element.name + "br2"} />
              <input autoComplete="off" readOnly={props.listOut ? true : false} key={props.request._id + element.name + "input"} id={props.request._id + element.name} defaultValue={props.request.userNames ? props.request.userNames[element.name] : ""} className="content roundCorner shorterTextField" type="text" name={element.name} />
            </div>
          )
        }
      })}
    </div>
  )
}

export default UserName
