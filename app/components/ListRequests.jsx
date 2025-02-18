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
import EditRequestTable from "./EditRequestTable.jsx"
import Pages from "./Pages.jsx"

import { showError } from "../utils.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function ListRequests(props) {
  const initialState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState()
  const [getTickets, setGetTickets] = useState(true)

  const [from, setFrom] = useState(0)
  const [displayNumber, setDisplayNumber] = useState(10)

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
          const incomingRequests = await Axios.get("/requests-list-all")
          setGetTickets(false)
          setRequests(incomingRequests.data)
          setIsLoading(false)
        } catch (err) {
          showError(err, appDispatch)
        }
      }
      getRequests()
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

      if (!values.type) {
        dataToSend.userNames = userNames
      }

      try {
        await Axios.post("/request-update", {
          dataToSend
        })

        appDispatch({ type: "flashMessageSuccess", value: "Kérelem mentése sikeres." })
        setGetTickets(true)
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
          <UpperFields readonly={true} listOut={true} request={request} />
          <Columns listOut={true} request={request} />
          <EditRequestTable request={request} />
          <CreateNewTextarea listOut={true} request={request} />
          <TechnicalTextarea listOut={true} request={request} />
          <form key={request._id + "form"} onSubmit={submitHandle}>
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
          <DistributionListFields request={request} generateInputFieldsNow={generateInputFieldsNow} setGenerateInputFieldsNow={setGenerateInputFieldsNow} inputFieldNumber={request.addresses.length} />
          <form key={request._id + "form"} onSubmit={submitHandle}>
            <AllowTextarea request={request} ticketContentId={`${index}contentKey`} />
            <input key={request._id + "distributionListIdInput"} type="hidden" name="type" value="distributionList" />
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
        <TableHead columns={columns} setRequests={setRequests} requests={requests} collection={"requests"} status={"requestForPermission"} />
        <div className="no-request-div">
          <span className="no-request-span"> Nincs engedélyezésre váró kérelem.</span>
        </div>
      </Page>
    )
  return (
    <Page title="Kérelmek listázása">
      <TableHead columns={columns} setRequests={setRequests} requests={requests} collection={"requests"} status={"requestForPermission"} />
      {requests.slice(from, from + displayNumber).map(function (request, index) {
        return request.mainAddress ? generateDistributionList(request, index) : generateUserRequest(request, index)
      })}
      <Pages from={from} setFrom={setFrom} displayNumber={displayNumber} setDisplayNumber={setDisplayNumber} arrayLength={requests.length} />
    </Page>
  )
}

export default ListRequests
