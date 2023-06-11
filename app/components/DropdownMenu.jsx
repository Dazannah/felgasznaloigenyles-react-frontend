import React, { useEffect, useState, useContext } from "react"
import Classes from "./Classes.jsx"

function DropdownMenu(props) {
  const [filterValue, setFilterValue] = useState("")

  function filterFunction(input) {
    setFilterValue(input.toUpperCase())
  }

  /*function filterFunction(input) {
    var filter, ul, li, a, i
    filter = input.toUpperCase()
    a = document.getElementsByClassName("classBtn")
    for (i = 0; i < a.length; i++) {
      let txtValue = a[i].innerHTML
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = ""
      } else {
        a[i].style.display = "none"
      }
    }
  }*/

  return (
    <>
      <input onChange={e => filterFunction(e.target.value)} type="text" className="roundCorner" placeholder="Keresés..." id="myInput" autoComplete="off" />
      <Classes classId={props.classId} setClassId={props.setClassId} className={props.className} setClassName={props.setClassName} filterValue={filterValue} />
    </>
  )
}

export default DropdownMenu
