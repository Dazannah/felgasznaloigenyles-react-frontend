import React, { useEffect, useState, useContext } from "react"
import ColumnBlueprint from "./ColumnBlueprint.jsx"
import NewColumnBlueprint from "./NewColumnBlueprint.jsx"
import Loading from "./Loading.jsx"

//
import StateContext from "../StateContext.jsx"

function columns(props) {
  const appState = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="three-checkBox">
      <div id="leftCheckBox">
        II.a Igényelt jogosultság felsorolása:
        <br />
        <br />
        {props.new ?
        <NewColumnBlueprint fillValue={props.fillValue} listOut={props.listOut} request={props.request} states={props.leftStates} arrays={appState.arrays.leftColumn} arrayPosition={"userPermissionsLeft"} />
        :
        <ColumnBlueprint fillValue={props.fillValue} listOut={props.listOut} request={props.request} states={props.leftStates} arrays={appState.arrays.leftColumn} arrayPosition={"userPermissionsLeft"} />
        }
        </div>

      <div id="middleCheckBox">
        II.b Jogosultsági szintek Ecostat:
        <br />
        <br />
        {props.new ?
        <NewColumnBlueprint fillValue={props.fillValue} listOut={props.listOut} request={props.request} states={props.middleStates} arrays={appState.arrays.middleColumn} arrayPosition={"userPermissionsMiddle"} />
        :
        <ColumnBlueprint fillValue={props.fillValue} listOut={props.listOut} request={props.request} states={props.middleStates} arrays={appState.arrays.middleColumn} arrayPosition={"userPermissionsMiddle"} />
        }
      </div>

      <div id="rightCheckBox">
        II.c Jogosultsági szintek Medworks:
        <br />
        <br />
        {props.new ?
        <NewColumnBlueprint fillValue={props.fillValue} listOut={props.listOut} request={props.request} states={props.rightStates} arrays={appState.arrays.rightColumn} arrayPosition={"userPermissionsRight"} />
        :
        <ColumnBlueprint fillValue={props.fillValue} listOut={props.listOut} request={props.request} states={props.rightStates} arrays={appState.arrays.rightColumn} arrayPosition={"userPermissionsRight"} />
        }
      </div>
    </div>
  )
}

export default columns
