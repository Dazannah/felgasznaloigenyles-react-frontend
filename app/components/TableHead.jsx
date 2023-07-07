import React, { useEffect, useState } from "react"

function TableHead(props) {
  const [sortField, setSortField] = useState()
  const [order, setOrder] = useState("asc")

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

  useEffect(() => {
    function addStyckiClass() {
      let div = document.getElementById("sortHead")
      if (div) {
        let divOffset = div.offsetTop
        let windowOfset = window.pageYOffset

        if (windowOfset > divOffset) {
          div.classList.add("stickyDiv")
        }
        if (windowOfset < 176) {
          div.classList.remove("stickyDiv")
        }
      }
    }

    window.addEventListener("scroll", addStyckiClass)

    return () => {
      window.removeEventListener("scroll", addStyckiClass)
    }
  }, [])

  return (
    <div id="sortHead" className="">
      {props.columns.map(({ label, accessor }) => {
        const cl = sortField === accessor && order === "asc" ? "upArrow" : sortField === accessor && order === "desc" ? "downArrow" : "defaultArrow"
        return (
          <span key={accessor} onClick={() => handleSortingChange(accessor)} className={cl}>
            {label}
          </span>
        )
      })}
    </div>
  )
}

export default TableHead
