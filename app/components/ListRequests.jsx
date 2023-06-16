import React, { useEffect, useState, useContext, useRef } from "react"
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
  const [getTickets, setGetTickets] = useState(true)

  const formRef = useRef(null)

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

  async function submitHandle(event) {
    event.preventDefault()
    const collapsibles = document.getElementsByClassName("collapsibleContent")
    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries())
    const keys = Object.keys(values)
    let leftColumnKeys = []

    initialState.arrays.leftColumn.forEach(element => {
      leftColumnKeys.push(element.name)
    })

    let dataToSend = {}
    let userNames = {}

    keys.map(keysElement => {
      initialState.arrays.leftColumn.forEach(element => {
        if (keysElement == element.name) {
          userNames[keysElement] = values[keysElement]
        } else {
          if (!leftColumnKeys.includes(keysElement)) {
            dataToSend[keysElement] = values[keysElement]
          }
        }
      })
    })

    dataToSend.userNames = userNames

    try {
      const result = await Axios.post("/request-update", {
        token: initialState.user.token,
        dataToSend
      })
      setGetTickets(true)

      appDispatch({ type: "flashMessagesSuccess", value: "Kérelem mentése sikeres." })
      formRef.current.reset()
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
      <TableHead columns={columns} setRequests={setRequests} requests={requests} />
      {requests.map(function (request, index) {
        return (
          <>
            <div key={request._id + "DivKey"} id={index + "Div"} className="request">
              <TableBody request={request} columns={columns} index={index} />
              <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
                <UpperFields listOut={true} request={request} />
                <Columns listOut={true} request={request} />
                <CreateNewTextarea listOut={true} request={request} />
                {request.technical.isTechnical ? <TechnicalTextarea listOut={true} request={request} /> : ""}
                <form key={request._id + "form"} onSubmit={submitHandle} ref={formRef}>
                  <UserName request={request} />
                  <AllowTextarea request={request} ticketContentId={`${index}contentKey`} />
                  <input key={request._id + "ticketIdInput"} type="hidden" name="ticketId" value={request._id} />
                  <input key={request._id + "submit"} type="submit" className="button" value="Küldés" />
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
