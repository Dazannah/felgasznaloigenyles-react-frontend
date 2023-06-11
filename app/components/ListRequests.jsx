import React, { useEffect, useState } from "react"
import Loading from "./Loading.jsx"
import Axios from "axios"

import Page from "./Page.jsx"

function ListRequests(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState()
  //const [ticketsState, setTicketsState] = useState([])

  const [displayValue, setDisplayValue] = useState("block")

  useEffect(() => {
    async function getRequests() {
      try {
        const requests = await Axios.post("/requests-list-all", {
          token: localStorage.getItem("jwt")
        })

        setRequests(requests.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    getRequests()
  }, [])

  function openContent(e) {
    const button = document.getElementById(e)
    if (button.style.display == "block") {
      button.style.display = "none"
    } else {
      button.style.display = "block"
    }
  }

  /*useEffect(() => {
    if (requests != undefined) {
      const tempTicketsState = generateState(requests)
      setTicketsState(tempTicketsState)
      console.log(tempTicketsState)
    }

    function generateState(array) {
      let statesArray = []
      let counter = 0

      array.forEach((element, index) => {
        let temp = "displayValue" + index
        let temp2 = "set" + "DisplayValue" + index
        statesArray[counter] = [temp, temp2] = useState("")
        counter++
      })
      return statesArray
    }
  }, [requests])*/

  if (isLoading)
    return (
      <Page title="Kérelmek listázása">
        <Loading />
      </Page>
    )

  if (requests.length == 0) return <Page title="Kérelmek listázása">No</Page>

  return (
    <Page title="Kérelmek listázása">
      {requests.map(function (request, index) {
        return (
          <>
            <div id={index + "Div"} className="request">
              <button id={index} type="button" className="collapsible roundcorner" onClick={() => openContent(index + "content")}>
                <strong>Név:</strong> {request.personalInformations.name} <strong>Osztály:</strong> {request.personalInformations.className} <strong>Nyilv. szám:</strong> {request.personalInformations.ticketId} <strong> Művelet: {request.process}</strong> Létrehozva: {request.ticketCreation.createTime} Igénylő: {request.ticketCreation.userName}{" "}
              </button>
              <div id={index + "content"} className="collapsibleContent ">
                <div id="row">
                  <div id="leftUp">
                    <label className="content roundCorner" htmlFor="name">
                      Név:
                    </label>
                    <br />
                    <input className="content roundCorner" type="text" id="name" name="name" defaultValue={request.personalInformations.name} readOnly />
                    <p />

                    <label className="content roundCorner" htmlFor="className">
                      Osztály:
                    </label>
                    <br />
                    <input className="content roundCorner" type="text" id="className" name="className" defaultValue={request.personalInformations.classNameName} readOnly />
                    <br />
                  </div>

                  <div id="rightUp">
                    <form>
                      <label className="content roundCorner" htmlFor="id">
                        Nyilv. szám:
                      </label>
                      <br />
                      <input className="content roundCorner" type="text" id="id" name="id" defaultValue={request.ticketId} readOnly />
                      <p />

                      <input type="radio" id="newUser" name="process" defaultValue="Új felhasználó" disabled checked={request.process == "Új felhasználó"} />
                      <label htmlFor="newUser" disabled>
                        Új felhasználó
                      </label>
                      <br />
                      <input type="radio" id="editUser" name="process" defaultValue="Felhasználó jog módosítás" disabled checked={request.process == "Felhasználó jog módosítás"} />
                      <label htmlFor="editUser" disabled>
                        Felhasználó jog módosítás
                      </label>
                      <br />
                      <input type="radio" id="deleteUser" name="process" defaultValue="Felhasználó törlése" disabled checked={request.process == "Felhasználó törlése"} />
                      <label htmlFor="deleteUser" disabled>
                        Felhasználó törlése
                      </label>
                      <br />
                    </form>
                  </div>
                </div>
                <div id="middle">
                  <label className="content roundCorner" htmlFor="classNameLeader">
                    Osztályvezető:
                  </label>
                  <br />
                  <input className="content roundCorner" type="text" id="classNameLeader" name="classNameLeader" defaultValue="<%= request.classNameLeader %>" readOnly />
                  <br />
                  <label className="content roundCorner" htmlFor="post">
                    Beosztás:
                  </label>
                  <br />
                  <input className="content roundCorner" type="text" id="post" name="post" defaultValue="<%= request.post %>" readOnly />
                  <br />
                  <label className="content roundCorner" htmlFor="location">
                    Munkavégzés helye:
                  </label>
                  <br />
                  <input className="content roundCorner" type="text" id="location" name="location" defaultValue="<%= request.location %>" readOnly />
                  <br />
                </div>
                <div id="validTo">
                  <div id="validToLeft">
                    <label className="content roundCorner" htmlFor="validFrom">
                      Érvényesség kezdete:
                    </label>
                    <br />
                    <input className="content roundCorner" type="datetime-local" id="validFrom" name="validFrom" defaultValue="<%= request.validFrom %>" readOnly />
                    <br />
                  </div>
                  <div id="validToRight" />
                  <label className="content roundCorner" htmlFor="validTo">
                    Érvényesség vége:
                  </label>
                  <br />
                  <input className="content roundCorner" type="datetime-local" id="validTo" name="validTo" defaultValue="<%= request.validTo %>" readOnly />
                  <br />
                </div>
                Egyéb igény (egyéb szakrendszer, alkalmazás, mobiltelefon, adathordozó, laptop használat):
                <br />
                <textarea value={request.createTextArea} className="roundCorner" id="textArea" name="otherTextArea" readOnly />
                <br />
                <br />
              </div>
            </div>
          </>
        )
      })}
    </Page>
  )
}

export default ListRequests
