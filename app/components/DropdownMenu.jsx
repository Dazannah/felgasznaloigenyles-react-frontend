import React, { useEffect, useState, useContext } from "react"
import Classes from "./Classes.jsx"

function DropdownMenu(props){

    function filterFunction(value) {
        console.log(value)
      }

return(
    <>
<input onChange={e => filterFunction(e.target.value)} type="text" className="roundCorner" placeholder="Keresés..." id="myInput" />
<Classes classId={props.classId} setClassId={props.setClassId} className={props.className} setClassName={props.setClassName}/>
</>
)



}

export default DropdownMenu
