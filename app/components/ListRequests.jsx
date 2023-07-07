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
import DistributionListFields from "./DistributionListFields.jsx"

import { showError } from "../utils.jsx"

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
    if (getTickets) {
      async function getRequests() {
        try {
          const incomingRequests = await Axios.get("/requests-list-all", {
            headers: {
              authorization: `Bearer ${initialState.user.token}`
            }
          })

          setRequests(incomingRequests.data)
          setIsLoading(false)
        } catch (err) {
          showError(err, appDispatch)
        }
      }
      getRequests()
      setGetTickets(false)
    }
  }, [getTickets])

  async function submitHandle(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries())
    const keys = Object.keys(values)
    let leftColumnKeys = []

    if (!values.permission) {
      appDispatch({ type: "flashMessageWarning", value: "Engedélyezés/elutasítás megadása kötelező." })
    } else {
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
        await Axios.post(
          "/request-update",
          {
            dataToSend
          },
          {
            headers: {
              authorization: `Bearer ${initialState.user.token}`
            }
          }
        )

        appDispatch({ type: "flashMessageSuccess", value: "Kérelem mentése sikeres." })
        setGetTickets(true)
        formRef.current.reset()
        window.scrollTo(0, 0)
      } catch (err) {
        showError(err, appDispatch)
      }
    }
  }

  function generateUserRequest(request, index) {
    return (
      <div key={request._id + "DivKey"} id={index + "Div"} className="request">
        <TableBody request={request} columns={columns} index={index} />
        <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
          <UpperFields listOut={true} request={request} />
          <Columns listOut={true} request={request} />
          <CreateNewTextarea listOut={true} request={request} />
          <TechnicalTextarea listOut={true} request={request} />
          <form key={request._id + "form"} onSubmit={submitHandle} ref={formRef}>
            <UserName request={request} />
            <AllowTextarea request={request} ticketContentId={`${index}contentKey`} />
            <input key={request._id + "ticketIdInput"} type="hidden" name="ticketId" value={request._id} />
            <input key={request._id + "submit"} type="submit" className="form-submit-input round-corner" value="Küldés" />
          </form>
        </div>
      </div>
    )
  }

  const [generateInputFieldsNow, setGenerateInputFieldsNow] = useState(true)

  function generateDistributionList(request, index) {
    return (
      <div key={request._id + "DivKey"} id={index + "Div"} className="request">
        <TableBody request={request} columns={columns} index={index} />
        <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
          <DistributionListFields request={request} generateInputFieldsNow={generateInputFieldsNow} setGenerateInputFieldsNow={setGenerateInputFieldsNow} inputFieldNumber={request.adresses.length} />
          <form key={request._id + "form"} onSubmit={submitHandle} ref={formRef}>
            <AllowTextarea request={request} ticketContentId={`${index}contentKey`} />
            <input key={request._id + "ticketIdInput"} type="hidden" name="ticketId" value={request._id} />
            <input key={request._id + "submit"} type="submit" className="form-submit-input round-corner" value="Küldés" />
          </form>
        </div>
      </div>
    )
  }

  if (isLoading)
    return (
      <Page title="Kérelmek listázása">
        <Loading />
      </Page>
    )

  if (requests.length == 0)
    return (
      <Page title="Kérelmek listázása">
        <TableHead columns={columns} setRequests={setRequests} requests={requests} />
        <div className="no-request-div">
          <span className="no-request-span"> Nincs engedélyezésre váró kérelem.</span>
        </div>
      </Page>
    )
  return (
    <Page title="Kérelmek listázása">
      <TableHead columns={columns} setRequests={setRequests} requests={requests} />
      {requests.map(function (request, index) {
        return request.mainAddress ? generateDistributionList(request, index) : generateUserRequest(request, index)
      })}
    </Page>
  )
}

export default ListRequests
