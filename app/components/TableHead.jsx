import React, { useState } from "react"

function TableHead(props) {
  const [sortField, setSortField] = useState("ticketCreation.createTime")
  const [order, setOrder] = useState("asc")

  function handleSortingChange(accessor) {
    const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc"
    setSortField(accessor)
    setOrder(sortOrder)
    props.handleSorting(accessor, sortOrder)
  }

  return (
    <div id="sortHead">
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
