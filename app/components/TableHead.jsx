import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { showError } from "../utils.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function TableHead(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [sortField, setSortField] = useState()
  const [order, setOrder] = useState("asc")
  const [timeoutId, setTimeoutId] = useState()

  function handleSortingChange(accessor) {
    const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc"
    setSortField(accessor)
    setOrder(sortOrder)
    handleSorting(accessor, sortOrder)
  }

  function giveBackSplitTmpValue(request, splitSortField) {
    if (request[splitSortField[0]]) {
      if (request[splitSortField[0]][splitSortField[1]]) {
        return request[splitSortField[0]][splitSortField[1]]
      } else {
        return "——"
      }
    } else {
      return "——"
    }
  }

  function handleSorting(sortField, sortOrder) {
    let sorted
    if (sortField) {
      const splitSortField = sortField.split(".")
      if (splitSortField.length > 1) {
        sorted = [...props.requests].sort((a, b) => {
          let aTmp = giveBackSplitTmpValue(a, splitSortField)
          let bTmp = giveBackSplitTmpValue(b, splitSortField)

          return (
            aTmp.toString().localeCompare(bTmp.toString(), "hu", {
              numeric: true
            }) * (sortOrder === "asc" ? 1 : -1)
          )
        })
      } else {
        sorted = [...props.requests].sort((a, b) => {
          let aTmp = a[splitSortField[0]] ? a[splitSortField[0]] : "——"
          let bTmp = b[splitSortField[0]] ? b[splitSortField[0]] : "——"

          return (
            aTmp.toString().localeCompare(bTmp.toString(), "hu", {
              numeric: true
            }) * (sortOrder === "asc" ? 1 : -1)
          )
        })
      }

      props.setRequests(sorted)
    }
  }

  async function search(value, accessor, status) {
    const timeout = setTimeout(async () => {
      sendData(value, accessor, status)
    }, 400)
    clearTimeout(timeoutId)
    setTimeoutId(timeout)
  }

  async function sendData(value, accessor, status) {
    try {
      const response = await Axios.post(
        "/table-head-search",
        {
          value,
          accessor,
          status,
          collection: props.collection
        },
        {
          headers: {
            authorization: `Bearer ${appState.user.token}`
          }
        }
      )
      if (Array.isArray(response.data)) {
        props.setRequests(response.data)
      } else {
        showError("Valami hiba tötént.", appDispatch)
      }
    } catch (err) {
      showError(err, appDispatch)
    }
  }

  useEffect(() => {
    function addStyckiClass() {
      let div = document.getElementById("sort-head")
      if (div) {
        let divOffset = div.offsetTop
        let windowOfset = window.pageYOffset

        if (windowOfset > divOffset) {
          div.classList.add("sticky-div")
        }
        if (windowOfset < 176) {
          div.classList.remove("sticky-div")
        }
      }
    }

    window.addEventListener("scroll", addStyckiClass)

    return () => {
      window.removeEventListener("scroll", addStyckiClass)
    }
  }, [])

  return (
    <div id="sort-head">
      {props.columns.map(({ label, accessor }) => {
        const cl = sortField === accessor && order === "asc" ? "upArrow" : sortField === accessor && order === "desc" ? "downArrow" : "defaultArrow"
        return (
          <div key={label + accessor + "div"} className="sort-element-wrapper">
            <span key={accessor} onClick={() => handleSortingChange(accessor)} className={cl + " sort-arrows"}></span>
            <span className="sort-text">{label}</span>
            <input type="text" placeholder={`Keresés`} name={"sort" + cl} className="sort-input" onChange={e => search(e.target.value, accessor, props.status)} />
          </div>
        )
      })}
    </div>
  )
}

export default TableHead
