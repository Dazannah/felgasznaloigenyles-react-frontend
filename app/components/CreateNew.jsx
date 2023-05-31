import React, { useEffect } from "react"
import Page from "./Page.jsx"

function CreateNew() {
  return (
    <Page title="Új létrehozás">
      <form id="createForm" action="/requestNew" method="post">
        <div id="row">
          <div id="leftUp">
            <label className="content roundCorner" htmlFor="name">
              Név:
            </label>
            <br />
            <input className="content roundCorner" type="text" id="name" name="name" required />
            <br />
            <p />
            includes/classNameDropdown
          </div>

          <div id="rightUp">
            <label className="content roundCorner" htmlFor="id">
              Nyilv. szám:
            </label>
            <br />
            <input className="content roundCorner" type="text" id="id" name="id" />
            <p />

            <input type="radio" id="newUser" name="process" value="Új felhasználó" required checked />
            <label htmlFor="newUser">Új felhasználó</label>
            <br />
          </div>
        </div>
        <div id="middle">
          <label className="content roundCorner" htmlFor="classNameLeader">
            Osztályvezető:
          </label>
          <br />
          <input className="content roundCorner" type="text" id="classNameLeader" name="classNameLeader" />
          <br />
          <label className="content roundCorner" htmlFor="post">
            Beosztás:
          </label>
          <br />
          <input className="content roundCorner" type="text" id="post" name="post" />
          <br />
          <label className="content roundCorner" htmlFor="location">
            Munkavégzés helye:
          </label>
          <br />
          <input className="content roundCorner" type="text" id="location" name="location" />
          <br />
        </div>
        <div id="validTo">
          <div id="validToLeft">
            <label className="content roundCorner" htmlFor="validFrom">
              Érvényesség kezdete:
            </label>
            <br />
            <input className="content roundCorner" type="datetime-local" id="validFrom" name="validFrom" />
            <br />
          </div>
          <div id="validToRight">
            <label className="content roundCorner" htmlFor="validTo">
              Érvényesség vége:
            </label>
            <br />
            <input className="content roundCorner" type="datetime-local" id="validTo" name="validTo" />
            <br />
          </div>
        </div>
        /columns/columns
        <br />
        <br />
        Egyéb igény (egyéb szakrendszer, alkalmazás, mobiltelefon, adathordozó, laptop használat):
        <br />
        <textarea className="roundCorner" id="textArea" name="otherTextArea"></textarea>
        <br />
        <br />
        <input type="hidden" name="csrf-token" value="" />
        <input type="submit" className="button" value="Küldés" />
      </form>
    </Page>
  )
}

export default CreateNew
