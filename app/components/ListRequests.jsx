import React, { useEffect, useState, useContext } from "react"
import Loading from "./Loading.jsx"
import Axios from "axios"

import Page from "./Page.jsx"

import UpperFields from "./UpperFields.jsx"
import Columns from "./Columns.jsx"
import CreateNewTextarea from "./CreateNewTextarea.jsx"
import AllowTextarea from "./AllowTextarea.jsx"
import TechnicalTextarea from "./TechnicalTextarea.jsx"
import TableBody from "./TableBody.jsx"
import TableHead from "./TableHead.jsx"
import UserName from "./UserName.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function ListRequests(props) {
  const initialState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState()
  const [ticketStates, setTicketStates] = useState([])
  const [getTickets, setGetTickets] = useState(true)

  const columns = [
    { label: "Név", accessor: "personalInformations.name" },
    { label: "Osztály", accessor: "personalInformations.className" },
    { label: "Nyilv. szám", accessor: "personalInformations.ticketId" },
    { label: "Művelet", accessor: "process" },
    { label: "Létrehozva", accessor: "ticketCreation.createTime" },
    { label: "Igénylő", accessor: "ticketCreation.userName" }
  ]

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

  function handleSorting(sortField, sortOrder) {
    let sorted
    if (sortField) {
      const splitSortField = sortField.split(".")
      if (splitSortField.length > 1) {
        sorted = [...requests].sort((a, b) => {
          return (
            a[splitSortField[0]][splitSortField[1]].toString().localeCompare(b[splitSortField[0]][splitSortField[1]].toString(), "hu", {
              numeric: true
            }) * (sortOrder === "asc" ? 1 : -1)
          )
        })
      } else {
        sorted = [...requests].sort((a, b) => {
          return (
            a[splitSortField[0]].toString().localeCompare(b[splitSortField[0]].toString(), "hu", {
              numeric: true
            }) * (sortOrder === "asc" ? 1 : -1)
          )
        })
      }

      setRequests(sorted)
    }
  }

  async function submitHandle(event) {
    event.preventDefault()
    const collapsibles = document.getElementsByClassName("collapsibleContent")
    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries())

    try {
      const result = await Axios.post("/request-update", {
        token: initialState.user.token,
        values
      })
      setGetTickets(true)

      for (let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].style.display = "none"
      }
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

  if (requests.length == 0) return <Page title="Kérelmek listázása">Nincs engedélyezésre váró kérelem.</Page>
  return (
    <Page title="Kérelmek listázása">
      <TableHead columns={columns} handleSorting={handleSorting} />
      {requests.map(function (request, index) {
        return (
          <>
            <div key={index + "DivKey"} id={index + "Div"} className="request">
              <TableBody request={request} columns={columns} index={index} />

              <div key={index + "contentKey"} id={index + "content"} className="collapsibleContent ">
                <UpperFields listOut={true} request={request} />
                <Columns listOut={true} request={request} />
                <CreateNewTextarea listOut={true} request={request} />
                {request.technical.isTechnical ? <TechnicalTextarea listOut={true} request={request} /> : ""}
                <form onSubmit={submitHandle}>
                  <UserName request={request} />
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
