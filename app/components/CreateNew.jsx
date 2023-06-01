import React, { useEffect, useState } from "react"
import Page from "./Page.jsx"
import Columns from "./Columns.jsx"
import Loading from "./Loading.jsx"
import Axios from "axios"

function CreateNew() {
  const [name, setName] = useState()
  const [ticketId, setTicketId] = useState()
  const [classLeader, setClassLeader] = useState()
  const [workPost, setWorkPost] = useState()
  const [workLocation, setWorkLocation] = useState()
  const [validFrom, setValidFrom] = useState()
  const [validTo, setValidTo] = useState()
  const [createTextArea, setCreateTextArea] = useState()

  async function createNewUserRequest(event){
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

    //console.log(personalInformations)
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
            <input onChange={(e) => setName(e.target.value)} className="content roundCorner" type="text" id="name" name="name" required />
            <br />
            <p />
          </div>

          <div id="rightUp">
            <label className="content roundCorner" htmlFor="id">
              Nyilv. szám:
            </label>
            <br />
            <input onChange={(e) => setTicketId(e.target.value)} className="content roundCorner" type="text" id="id" name="id" />
            <p />

            <input type="radio" id="newUser" name="process" value="Új felhasználó" required checked readOnly />
            <label htmlFor="newUser">Új felhasználó</label>
            <br />
          </div>
        </div>
        <div id="middle">
          <label className="content roundCorner" htmlFor="classLeader">
            Osztályvezető:
          </label>
          <br />
          <input onChange={(e) => setClassLeader(e.target.value)} className="content roundCorner" type="text" id="classLeader" name="classLeader" required/>
          <br />
          <label className="content roundCorner" htmlFor="workPost">
            Beosztás:
          </label>
          <br />
          <input onChange={(e) => setWorkPost(e.target.value)} className="content roundCorner" type="text" id="workPost" name="workPost" required/>
          <br />
          <label className="content roundCorner" htmlFor="workLocation" required>
            Munkavégzés helye:
          </label>
          <br />
          <input onChange={(e) => setWorkLocation(e.target.value)} className="content roundCorner" type="text" id="workLocation" name="workLocation" required/>
          <br />
        </div>
        <div id="validTo">
          <div id="validToLeft">
            <label className="content roundCorner" htmlFor="validFrom">
              Érvényesség kezdete:
            </label>
            <br />
            <input onChange={(e) => setValidFrom(e.target.value)} className="content roundCorner" type="datetime-local" id="validFrom" name="validFrom" />
            <br />
          </div>
          <div id="validToRight">
            <label className="content roundCorner" htmlFor="validTo">
              Érvényesség vége:
            </label>
            <br />
            <input onChange={(e) => setValidTo(e.target.value)} className="content roundCorner" type="datetime-local" id="validTo" name="validTo" />
            <br />
          </div>
        </div>


        <Columns />
        <br/><br /><br />


        <br />
        <br />
        Egyéb igény (egyéb szakrendszer, alkalmazás, mobiltelefon, adathordozó, laptop használat):
        <br />
        <textarea onChange={(e) => setCreateTextArea(e.target.value)} className="roundCorner textArea" id="createTextArea" name="createTextArea"></textarea>
        <br />
        <br />
        <input type="hidden" name="csrf-token" value="" />
        <input type="submit" className="button" value="Küldés" />
      </form>
    </Page>
  )
}

export default CreateNew
