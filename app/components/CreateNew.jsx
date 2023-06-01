import React, { useEffect, useState, useContext } from "react"
import Page from "./Page.jsx"
import Columns from "./Columns.jsx"
import Loading from "./Loading.jsx"
import Axios from "axios"

import Classes from "./Classes.jsx"

import StateContext from "../StateContext.jsx"

function CreateNew() {
  const appState = useContext(StateContext)
  const [dropDown, setDropdown] = useState(true)

  const [name, setName] = useState()
  const [ticketId, setTicketId] = useState()
  const [classId, setClassId] = useState()
  const [classLeader, setClassLeader] = useState()
  const [workPost, setWorkPost] = useState()
  const [workLocation, setWorkLocation] = useState()
  const [validFrom, setValidFrom] = useState()
  const [validTo, setValidTo] = useState()
  const [createTextArea, setCreateTextArea] = useState()

  function generateState(array) {
    let statesArray = []
    let counter = 0

    array.forEach(element => {
      let temp = element.id
      let temp2 = "set" + element.id
      statesArray[counter] = [temp, temp2] = useState()
      counter++
    })

    return statesArray
  }

  const statesLeftCollumn = generateState(appState.arrays.leftColumn)
  const statesMiddleCollumn = generateState(appState.arrays.middleColumn)
  const statesRightCollumn = generateState(appState.arrays.rightColumn)

  function getUserPermissions(permissionsArray) {
    let resultPermissionArray = []
    permissionsArray.forEach((element, index) => {
      resultPermissionArray[index] = element[0]
    })
    return resultPermissionArray
  }

  async function createNewUserRequest(event) {
    event.preventDefault()
    const personalInformations = {
      name,
      ticketId,
      classLeader,
      workPost,
      workLocation,
      validFrom,
      validTo,
      createTextArea
    }
    const userPermissionsLeft = getUserPermissions(statesLeftCollumn)
    const userPermissionsMiddle = getUserPermissions(statesMiddleCollumn)
    const userPermissionsRight = getUserPermissions(statesRightCollumn)

    console.log(personalInformations, userPermissionsLeft, userPermissionsMiddle, userPermissionsRight)
  }

  function filterFunction(value) {
    console.log(value)
  }

  function dropdownMenu(e) {
    e.preventDefault()
    if (dropDown) {
      document.getElementById("myDropdown").removeAttribute("hidden")
      setDropdown(false)
    } else {
      document.getElementById("myDropdown").setAttribute("hidden", "hidden")
      setDropdown(true)
    }
  }

  return (
    <Page title="Új létrehozás">
      <form onSubmit={createNewUserRequest}>
        <div id="row">
          <div id="leftUp">
            <label className="content roundCorner" htmlFor="name">
              Név:
            </label>
            <br />
            <input onChange={e => setName(e.target.value)} className="content roundCorner" type="text" id="name" name="name" />
            <br />
            <p />
            <div className="dropdown">
              <button onClick={e => dropdownMenu(e)} type="button" id="dropdownButton" className="btn">
                Osztály kiválasztása
              </button>
              <div id="myDropdown" className="dropdown-content" hidden>
                <input onChange={e => filterFunction(e.target.value)} type="text" className="roundCorner" placeholder="Keresés..." id="myInput" />
                <Classes setClassId={setClassId} />
              </div>
            </div>

            <input className="content roundCorner" type="text" id="class" name="class" required readOnly />
            <br />
            <br />
            <input hidden className="content roundCorner" type="text" id="classDbId" name="dbId" readOnly />
          </div>

          <div id="rightUp">
            <label className="content roundCorner" htmlFor="id">
              Nyilv. szám:
            </label>
            <br />
            <input onChange={e => setTicketId(e.target.value)} className="content roundCorner" type="text" id="id" name="id" />
            <p />

            <input type="radio" id="newUser" name="process" value="Új felhasználó" checked readOnly />
            <label htmlFor="newUser">Új felhasználó</label>
            <br />
          </div>
        </div>
        <div id="middle">
          <label className="content roundCorner" htmlFor="classLeader">
            Osztályvezető:
          </label>
          <br />
          <input onChange={e => setClassLeader(e.target.value)} className="content roundCorner" type="text" id="classLeader" name="classLeader" />
          <br />
          <label className="content roundCorner" htmlFor="workPost">
            Beosztás:
          </label>
          <br />
          <input onChange={e => setWorkPost(e.target.value)} className="content roundCorner" type="text" id="workPost" name="workPost" />
          <br />
          <label className="content roundCorner" htmlFor="workLocation">
            Munkavégzés helye:
          </label>
          <br />
          <input onChange={e => setWorkLocation(e.target.value)} className="content roundCorner" type="text" id="workLocation" name="workLocation" />
          <br />
        </div>
        <div id="validTo">
          <div id="validToLeft">
            <label className="content roundCorner" htmlFor="validFrom">
              Érvényesség kezdete:
            </label>
            <br />
            <input onChange={e => setValidFrom(e.target.value)} className="content roundCorner" type="datetime-local" id="validFrom" name="validFrom" />
            <br />
          </div>
          <div id="validToRight">
            <label className="content roundCorner" htmlFor="validTo">
              Érvényesség vége:
            </label>
            <br />
            <input onChange={e => setValidTo(e.target.value)} className="content roundCorner" type="datetime-local" id="validTo" name="validTo" />
            <br />
          </div>
        </div>
        <Columns leftStates={statesLeftCollumn} middleStates={statesMiddleCollumn} rightStates={statesRightCollumn} />
        <br />
        <br />
        <br />
        <br />
        <br />
        Egyéb igény (egyéb szakrendszer, alkalmazás, mobiltelefon, adathordozó, laptop használat):
        <br />
        <textarea onChange={e => setCreateTextArea(e.target.value)} className="roundCorner textArea" id="createTextArea" name="createTextArea"></textarea>
        <br />
        <br />
        <input type="hidden" name="csrf-token" value="" />
        <input type="submit" className="button" value="Küldés" />
      </form>
    </Page>
  )
}

export default CreateNew
