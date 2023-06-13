import React, { useEffect, useState, useContext } from "react"
import Classes from "./Classes.jsx"

function DropdownMenu(props) {
  const [dropDown, setDropdown] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [filterValue, setFilterValue] = useState("")

  useEffect(()=>{
    let filter, ul, li, a
    filter = filterValue.toUpperCase()
    a = document.getElementsByClassName("classBtn")
    for (let i = 0; i < a.length; i++) {
      let txtValue = a[i].innerHTML
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = ""
      } else {
        a[i].style.display = "none"
      }
    }
  },[filterValue])

  function hiddeDropdown() {
    setIsVisible(false)
    setDropdown(true)
    setFilterValue("")
  }

  useEffect(() => {
    document.addEventListener("mouseup", e => {
      hideDropdownListener(e)
    })

    return document.removeEventListener("mouseup", e => {
      hideDropdownListener(e)
    })

    function hideDropdownListener(e){
      const clickId = e.target.id

      if (clickId != "dropdownButton" && clickId != "myInput" && clickId != "" && clickId != "myDropdown") {
        hiddeDropdown()
      }
    }
  }, [])

  function dropdownMenu(e) {
    e.preventDefault()
    if (dropDown) {
      setIsVisible(true)
      setDropdown(false)
    } else {
      hiddeDropdown()
    }
  }

  return (
    <>
      <div className="dropdown">
        <button onClick={e => dropdownMenu(e)} type="button" id="dropdownButton" className="btn">
          Osztály kiválasztása
        </button>
        <div id="myDropdown" className={isVisible ? "show " + "dropdown-content" : " " + "dropdown-content"}>
          <input onChange={e => setFilterValue(e.target.value)} type="text" className="roundCorner" placeholder="Keresés..." id="myInput" autoComplete="off" value={filterValue}/>
          <Classes filterValue={filterValue} />
        </div>
      </div>
    </>
  )
}

export default DropdownMenu
