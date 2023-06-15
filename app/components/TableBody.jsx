import React from "react"

function TableBody(props) {
  return (
    <div key={props.request._id} id="sortTextWrapper">
      {props.columns.map(({ accessor }) => {
        const splitAccessor = accessor.split(".")
        if (splitAccessor.length > 1) {
          const tData = props.request[splitAccessor[0]][splitAccessor[1]] ? props.request[splitAccessor[0]][splitAccessor[1]] : "——"
          return (
            <div key={accessor} className="sortText">
              {tData}
            </div>
          )
        } else {
          const tData = props.request[accessor] ? props.request[accessor] : "——"
          console.log(tData)
          return (
            <div key={accessor} {...(tData == "Új felhasználó" ? { className: "sortText greenColor" } : "")}>
              {tData}
            </div>
          )
        }
      })}
    </div>
  )
}
export default TableBody
