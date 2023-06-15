import React, { useEffect, useState, useContext } from "react"
import Loading from "./Loading.jsx"
import Axios from "axios"

import Page from "./Page.jsx"

import UpperFields from "./UpperFields.jsx"
import Columns from "./Columns.jsx"
import CreateNewTextarea from "./CreateNewTextarea.jsx"
import AllowTextarea from "./AllowTextarea.jsx"
import TechnicalTextarea from "./TechnicalTextarea.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function ListRequests(props) {
  const initialState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState()
  const [ticketStates, setTicketStates] = useState([])
  const [getTickets, setGetTickets] = useState(true)

  useEffect(() => {
    async function getRequests() {
      try {
        const incomingRequests = await Axios.post("/requests-list-all", {
          token: initialState.user.token
        })

        setRequests(incomingRequests.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    getRequests()
    setGetTickets(false)
  }, [getTickets])

  function openContent(e) {
    const button = document.getElementById(e)
    if (button.style.display == "block") {
      button.style.display = "none"
    } else {
      button.style.display = "block"
    }
  }

  async function submitHandle(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries())

    try {
      const result = await Axios.post("/request-update", {
        token: initialState.user.token,
        values
      })
      setGetTickets(true)
      appDispatch({ type: "flashMessagesSuccess", value: "Kérelem mentése sikeres." })
      window.scrollTo(0, 0)
    } catch (error) {
      console.log(error)
    }
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
                <UpperFields listOut={true} request={request} />
                <Columns listOut={true} request={request} />
                <CreateNewTextarea listOut={true} request={request} />
                {request.technical.isTechnical ? <TechnicalTextarea listOut={true} request={request} /> : ""}
                <form onSubmit={submitHandle}>
                  <AllowTextarea request={request} ticketStates={ticketStates} ticketContentId={`${index}contentKey`} />

                  <input type="hidden" name="ticketId" value={request._id} />
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
