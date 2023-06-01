import React, { useEffect, useState } from "react"

function ColumnBlueprint(props) {
    return(
        <div>
            {props.arrays.map((element, index)=>{
                return(
                <div key={index}>
                    <input type="checkbox" name={element.name} id={element.id}/>
                    <label htmlFor={element.id}>{element.value}</label><br/>
                </div>
                )

            })

            }

        </div>

    )
}

export default ColumnBlueprint
