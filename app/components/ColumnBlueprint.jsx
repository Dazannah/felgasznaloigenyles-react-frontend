import React, { useEffect, useState } from "react"

function ColumnBlueprint(props) {
  let index = 0
  return (
    <div>
      {props.arrays.map((element) => {
        if(props.isEdit || props.request[`${props.arrayPosition}`][index].name == element.name){
        let shouldSkip = true
          props.request[`${props.arrayPosition}`].forEach(userColumnElement =>{
            if(props.isEdit || userColumnElement.name == element.name) {
              shouldSkip = false
            }
          })

          if(shouldSkip) return

          let tmpIndex = index
          index++
            return (
              <div key={index}>
                <input
                  id={element.id}
                  autoComplete="off"
                  {...(props.fillValue ? { defaultChecked: props.request[`${props.arrayPosition}`][tmpIndex]?.value } : "")}
                  {...(props.listOut ? { defaultChecked: props.request[`${props.arrayPosition}`][tmpIndex]?.value, disabled: true } : "")}
                  onClick={e => {
                    props.states[tmpIndex][1]({ ...props.states[tmpIndex][0], value: e.target.checked })
                  }}
                  type="checkbox"
                  name={element.name}
                />
                <label htmlFor={element.id}>{element.value}</label>
                <br />
              </div>
            )
        }
      })}
    </div>
  )
}

export default ColumnBlueprint
