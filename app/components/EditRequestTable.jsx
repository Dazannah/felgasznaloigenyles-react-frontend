import React, { useEffect, useContext } from "react"

import StateContext from "../StateContext.jsx"

function EditRequestTable(props) {
  const initialState = useContext(StateContext)

  function generateTable() {
    const dataToRender = getDataTorender()

    return <table className="edit-table group round-corner">{dataVisualisation(dataToRender)}</table>
  }

  function dataVisualisation(dataToRender) {
    return dataToRender.map(element => {
      return (
        <>
          <tr>
            <td>{element.name}</td>
            <td className={getColor(element.process)}>{element.process}</td>
          </tr>
        </>
      )
    })
  }

  function getColor(process) {
    if (process == "Hozzáadás") return "greenColor"
    if (process == "Törlés") return "redColor"
    if (process == "Módosítás") return "orangeColor"
  }

  function getDataTorender() {
    const changeKeys = Object.keys(props.request.change)
    const arraysKeys = Object.keys(initialState.arrays)

    const dataToRender = []

    initialState.arrays.leftColumn
    initialState.arrays.middleColumn
    initialState.arrays.rightColumn

    changeKeys.forEach(key => {
      let processToShow

      if (key === "add") processToShow = "Hozzáadás"
      if (key === "delete") processToShow = "Törlés"
      if (key === "edit") processToShow = "Módosítás"

      props.request.change[key].forEach(element => {
        arraysKeys.forEach(arrayName => {
          initialState.arrays[arrayName].forEach(arrayElement => {
            if (arrayElement.name === element.name) dataToRender.push({ name: arrayElement.value, process: processToShow })
          })
        })
      })
    })

    return dataToRender
  }

  if (props.request.change) {
    if (props.request.change.add.length == 0 && props.request.change.delete.length == 0 && props.request.change.edit.length == 0) {
      return ""
    } else {
      return generateTable()
    }
  }
}

export default EditRequestTable
