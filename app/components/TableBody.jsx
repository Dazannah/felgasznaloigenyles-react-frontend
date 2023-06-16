import React from "react"

function TableBody(props) {
  function openContent(e) {
    const button = document.getElementById(e)
    if (button.style.display == "block") {
      button.style.display = "none"
    } else {
      button.style.display = "block"
    }
  }

  return (
    <button key={props.request._id + "button"} id={props.request._id + "button"} type="button" className="collapsible roundcorner" onClick={() => openContent(props.index + "content")}>
      <div key={props.request._id} id="sortTextWrapper">
        {props.columns.map(({ accessor }, index) => {
          const splitAccessor = accessor.split(".")
          if (splitAccessor.length > 1) {
            const tData = props.request[splitAccessor[0]][splitAccessor[1]] ? props.request[splitAccessor[0]][splitAccessor[1]] : "——"
            return (
              <div key={props.request._id + "Data" + index} className="sortText">
                {tData}
              </div>
            )
          } else {
            const tData = props.request[accessor] ? props.request[accessor] : "——"
            return (
              <div key={props.request._id + "Data" + index} {...(tData == "Új felhasználó" ? { className: "sortText greenColor" } : "")}>
                {tData}
              </div>
            )
          }
        })}
      </div>
    </button>
  )
}
export default TableBody
