import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import ColumnBlueprint from "./ColumnBlueprint.jsx"
import Loading from "./Loading.jsx"

//
import StateContext from "../StateContext.jsx"

function columns(props) {
    const appState = useContext(StateContext)
    const [isLoading, setIsLoading] = useState(false)

    if(isLoading){
        return <Loading/>
    }

        return (
            <div id="threeCheckBox">
                <div id="leftCheckBox">
    
                    II.a Igényelt jogosultság felsorolása:<br/><br/>
                    <ColumnBlueprint arrays={appState.arrays.leftColumn}/>
                </div>
    
                <div id="middleCheckBox">
                    II.b Jogosultsági szintek Ecostat:<br/><br/>
                    <ColumnBlueprint arrays={appState.arrays.middleColumn}/>
                </div>
    
                <div id="rightCheckBox">
                    II.c Jogosultsági szintek Medworks:<br/><br/>
                    <ColumnBlueprint arrays={appState.arrays.rightColumn}/>
                </div>
            </div>
        )
    
}

export default columns
