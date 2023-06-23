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
import IsDone from "./IsDone.jsx"

import StateContext from "../StateContext.jsx"

function CompletedTickets(props) {
  const initialState = useContext(StateContext)

  const [isLoading, setIsLoading] = useState(true)
  const [completedRequests, setCompletedRequests] = useState()
  const [getRequests, setGetRequests] = useState(true)

  useEffect(() => {
    if (getRequests) {
      async function getCompletedRequests() {
        const response = await Axios.get("/get-completed-tickets", {
          headers: {
            authorization: `Bearer ${initialState.user.token}`
          }
        })
        setCompletedRequests(response.data)
        setIsLoading(false)
        setGetRequests(false)
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
    { label: "Lezárt", accessor: "completed.time" }
  ]

  if (isLoading)
    return (
      <Page title="Lezárt kérelmek">
        <Loading />
      </Page>
    )

  if (completedRequests.length == 0) {
    return (
      <Page title="Lezárt kérelmek">
        <TableHead columns={columns} setRequests={setCompletedRequests} requests={completedRequests} />
        Nincs elkészült kérelmek.
      </Page>
    )
  }

  return (
    <Page title="Lezárt kérelmek">
      <TableHead columns={columns} setRequests={setCompletedRequests} requests={completedRequests} />
      {completedRequests.map(function (request, index) {
        return (
          <div key={request._id + "DivKey"} id={index + "Div"} className="request">
            <TableBody request={request} columns={columns} index={index} />
            <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
              <UpperFields listOut={true} request={request} />

              <Columns listOut={true} request={request} />
              <CreateNewTextarea listOut={true} request={request} />
              <TechnicalTextarea listOut={true} request={request} />

              <UserName listOut={true} request={request} />
              <AllowTextarea request={request} ticketContentId={`${index}contentKey`} />
              <IsDone listOut={true} request={request} />
            </div>
          </div>
        )
      })}
    </Page>
  )
}

export default CompletedTickets
