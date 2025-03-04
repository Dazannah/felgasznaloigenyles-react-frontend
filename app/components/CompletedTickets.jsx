import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"

import Page from "./Page.jsx"
import TableHead from "./TableHead.jsx"
import TableBody from "./TableBody.jsx"
import UpperFields from "./UpperFields.jsx"
import Columns from "./Columns.jsx"
import CreateNewTextarea from "./CreateNewTextarea.jsx"
import UserName from "./UserName.jsx"
import AllowTextarea from "./AllowTextarea.jsx"
import Loading from "./Loading.jsx"
import TechnicalTextarea from "./TechnicalTextarea.jsx"
import DistributionListFields from "./DistributionListFields.jsx"
import RequestDetails from "./RequestDetails.jsx"
import Pages from "./Pages.jsx"

import { showError } from "../utils.jsx"

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"

function CompletedTickets(props) {
  const initialState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [isLoading, setIsLoading] = useState(true)
  const [completedRequests, setCompletedRequests] = useState()
  const [getRequests, setGetRequests] = useState(true)

  const [from, setFrom] = useState(0)
  const [displayNumber, setDisplayNumber] = useState(10)

  useEffect(() => {
    if (getRequests) {
      async function getCompletedRequests() {
        try {
          const response = await Axios.get("/get-completed-tickets")
          setGetRequests(false)
          setCompletedRequests(response.data)
          setIsLoading(false)
        } catch (err) {
          showError(err, appDispatch)
        }
      }

      getCompletedRequests()
    }
  }, [getRequests])

  const columns = [
    { label: "Név", accessor: "personalInformations.name" },
    { label: "Osztály", accessor: "personalInformations.className" },
    { label: "Nyilv. szám", accessor: "personalInformations.ticketId" },
    { label: "Művelet", accessor: "process" },
    { label: "Engedélyezve", accessor: "permission.allowed" },
    { label: "Engedélyező", accessor: "permission.authorizedBy" },
    { label: "Lezárt", accessor: "completed.createTime" }
  ]

  function generateUserRequest(request, index) {
    return (
      <div key={request._id + "DivKey"} id={index + "Div"} className="request">
        <TableBody request={request} columns={columns} index={index} />
        <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
          <form autoComplete="off" key={request._id + "wrapperForBecouseOfRadioButtons"}>
            <UpperFields listOut={true} request={request} readonly={true} />
            <Columns listOut={true} request={request} />
            <CreateNewTextarea listOut={true} request={request} />
            <TechnicalTextarea listOut={true} request={request} />
            <UserName listOut={true} request={request} />
            <RequestDetails request={request} />
            <AllowTextarea request={request} ticketContentId={`${index}contentKey`} />
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
          <DistributionListFields request={request} generateInputFieldsNow={generateInputFieldsNow} setGenerateInputFieldsNow={setGenerateInputFieldsNow} inputFieldNumber={request.emailRedirects.length} />
          <RequestDetails request={request} />
        </div>
      </div>
    )
  }

  if (isLoading)
    return (
      <Page title="Lezárt kérelmek">
        <Loading />
      </Page>
    )

  if (completedRequests.length == 0) {
    return (
      <Page title="Lezárt kérelmek">
        <TableHead columns={columns} setRequests={setCompletedRequests} requests={completedRequests} collection={"requests"} status={"closed"} />
        <div className="no-request-div">
          <span className="no-request-span"> Nincs lezárt kérelem.</span>
        </div>
      </Page>
    )
  }

  return (
    <Page title="Lezárt kérelmek">
      <TableHead columns={columns} setRequests={setCompletedRequests} requests={completedRequests} collection={"requests"} status={"closed"} />
      {completedRequests.slice(from, from + displayNumber).map((request, index) => {
        return request.email ? generateDistributionList(request, index) : generateUserRequest(request, index)
      })}
      <Pages from={from} setFrom={setFrom} displayNumber={displayNumber} setDisplayNumber={setDisplayNumber} arrayLength={completedRequests.length} />
    </Page>
  )
}

export default CompletedTickets
