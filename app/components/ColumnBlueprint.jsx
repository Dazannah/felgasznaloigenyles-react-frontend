import React, { useEffect, useState } from "react"

function ColumnBlueprint(props) {
    return(
        <div>
            {props.arrays.map((element, index)=>{
                return(
                <div key={index}>
                    <input onChange={(e) => props.states[index][1]({...props.states[index][0], value: e.target.checked})} type="checkbox" name={element.name} id={element.id}/>
                    <label htmlFor={element.id}>{element.value}</label><br/>
                </div>
                )

            })

            }

        </div>

    )
}

export default ColumnBlueprint
