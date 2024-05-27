import React, { useEffect, useState } from "react"

function ColumnBlueprint(props) {
  let index = 0
  return (
    <div>
      {props.arrays.map((element) => {
        if(props.request[`${props.arrayPosition}`][index].name == element.name){
          let tmpIndex = index
          index++
          try{
            return (
              <div key={index}>
                <input
                  id={element.id}
                  autoComplete="off"
                  {...(props.fillValue ? { defaultChecked: props.request[`${props.arrayPosition}`][tmpIndex].value } : "")}
                  {...(props.listOut ? { defaultChecked: props.request[`${props.arrayPosition}`][tmpIndex].value, disabled: true } : "")}
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
          }catch(err){
            console.log(err)
            console.log(props.arrayPosition, index)
            console.log(props.request)
          }
        }
      })}
    </div>
  )
}

export default ColumnBlueprint
