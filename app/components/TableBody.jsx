import React, { useContext } from "react"

import StateContext from "../StateContext.jsx"

function TableBody(props) {
  const appState = useContext(StateContext)

  function openContent(e) {
    const button = document.getElementById(e)
    if (button.style.display === "block") {
      button.style.display = "none"
    } else {
      button.style.display = "block"
    }
  }

  const objectForStyles = {
    "permission.allowed": {
      Elutasított: "redColor",
      Engedélyezett: "greenColor"
    },
    process: {
      "Új felhasználó": "greenColor",
      "Felhasználó törlése": "redColor",
      "Felhasználó módosítása": "orangeColor",
      "Felhasználó jog módosítás": "orangeColor",
      "Új terjesztési lista": "greenColor"
    },
    status: {
      Aktív: "greenColor",
      Törölt: "redColor"
    },
    default: " sortText"
  }

  return (
    <button key={props.request._id + "button"} id={props.request._id + "button"} type="button" className="collapsible roundcorner" onClick={() => openContent(props.index + "content")}>
      <div key={props.request._id} id="sortTextWrapper">
        {props.columns.map(({ accessor }, index) => {
          const splitAccessor = accessor.split(".")
          const isNestedProperty = splitAccessor.length > 1
          let tData = ""
          if (isNestedProperty) {
            const nestedProperty = props.request[splitAccessor[0]]
            if (props.request.mainAddress && splitAccessor[1] === "name") {
              tData = props.request.mainAddress + appState.emailDomain
            } else if (props.request.userNames && props.request.userNames.eMail && splitAccessor[1] === "eMail") {
              const emailArray = props.request.userNames.eMail.split(" ")
              emailArray.forEach(element => (tData += element + appState.emailDomain + " "))
            } else if (splitAccessor[1] === "isTechnical") {
              tData = props.request.technical.isTechnical === "Igen" ? "Igen" : "——"
            } else if (nestedProperty) {
              tData = nestedProperty[splitAccessor[1]] ? nestedProperty[splitAccessor[1]] : "——"
            } else {
              tData = "——"
            }
          } else {
            tData = props.request[accessor] ? props.request[accessor] : "——"
          }

          let statusClassName
          if (isNestedProperty) {
            if (objectForStyles[`${splitAccessor[0]}.${splitAccessor[1]}`]) {
              statusClassName = objectForStyles[`${splitAccessor[0]}.${splitAccessor[1]}`][tData]
            }
          } else {
            if (objectForStyles[accessor]) {
              statusClassName = objectForStyles[accessor][tData]
            }
          }

          return (
            <div key={props.request._id + "Data" + index} className={statusClassName ? statusClassName + objectForStyles.default : objectForStyles.default}>
              {tData}
            </div>
          )
        })}
      </div>
    </button>
  )
}
export default TableBody
