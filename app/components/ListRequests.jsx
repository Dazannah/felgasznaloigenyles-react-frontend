import React, { useEffect, useState } from "react"
import Loading from "./Loading.jsx"
import Axios from "axios"

import Page from "./Page.jsx"

import UpperFields from "./UpperFields.jsx"
import Columns from "./Columns.jsx"
import CreateNewTextarea from "./CreateNewTextarea.jsx"
import AllowTextarea from "./AllowTextarea.jsx"

function ListRequests(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState()
  const [isAllowed, setIsAllowed] = useState()

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

  function submitHandle(event){
    event.preventDefault()
    console.log("asd")
  }

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
            <div key={index + "DivKey"} id={index + "Div"} className="request">
              <button id={index} type="button" className="collapsible roundcorner" onClick={() => openContent(index + "content")}>
                <strong>Név:</strong> {request.personalInformations.name} <strong>Osztály:</strong> {request.personalInformations.className} <strong>Nyilv. szám:</strong> {request.personalInformations.ticketId} <strong> Művelet: {request.process}</strong> Létrehozva: {request.ticketCreation.createTime} Igénylő: {request.ticketCreation.userName}{" "}
              </button>
              <div key={index + "contentKey"} id={index + "content"} className="collapsibleContent ">
                <form onSubmit={submitHandle}>
                  <UpperFields listOut={true} request={request}/>
                  <Columns listOut={true} request={request}/>
                  <CreateNewTextarea listOut={true} request={request}/>
                  <AllowTextarea request={request} setIsAllowed={setIsAllowed}/>

                  <input type="hidden" name="csrf-token" value="" />
                  <input type="submit" className="button" value="Küldés" />
                </form>
              </div>
            </div>
          </>
        )
      })}
    </Page>
  )
}

export default ListRequests
