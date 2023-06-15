import React, { useEffect, useState } from "react"

function TableHead(props) {
  const [sortField, setSortField] = useState("ticketCreation.createTime")
  const [order, setOrder] = useState("asc")

  function handleSortingChange(accessor) {
    const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc"
    setSortField(accessor)
    setOrder(sortOrder)
    props.handleSorting(accessor, sortOrder)
  }

  useEffect(() => {
    function addStyckiClass() {
      let div = document.getElementById("sortHead")
      let divOffset = div.offsetTop
      let windowOfset = window.pageYOffset

      if (windowOfset > divOffset) {
        div.classList.add("stickyDiv")
      }
      if (windowOfset < 176) {
        div.classList.remove("stickyDiv")
      }
    }
    window.addEventListener("scroll", () => {
      addStyckiClass()
    })

    return window.removeEventListener("scroll", addStyckiClass())
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
