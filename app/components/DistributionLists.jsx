import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"

import Page from "./Page.jsx"
import TableHead from "./TableHead.jsx"
import TableBody from "./TableBody.jsx"
import DistributionListFields from "./DistributionListFields.jsx"
import Loading from "./Loading.jsx"

import { showError } from "../utils.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function DistributionLists(props) {
  const initialState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [isLoading, setIsLoading] = useState(true)
  const [completedRequests, setCompletedRequests] = useState()
  const [getRequests, setGetRequests] = useState(true)

  const [generateInputFieldsNow, setGenerateInputFieldsNow] = useState(true)

  useEffect(() => {
    if (getRequests) {
      async function getCompletedRequests() {
        try {
          const response = await Axios.get("/get-distribution-lists", {
            headers: {
              authorization: `Bearer ${initialState.user.token}`
            }
          })
          setCompletedRequests(response.data)
          setIsLoading(false)
          setGetRequests(false)
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
    { label: "Lezárt", accessor: "completed.time" }
  ]

  if (isLoading)
    return (
      <Page title="Terjesztési listák">
        <Loading />
      </Page>
    )

  return (
    <Page title="Terjesztési listák">
      <TableHead columns={columns} setRequests={setCompletedRequests} requests={completedRequests} />
      {completedRequests.map(function (request, index) {
        ;<div key={request._id + "DivKey"} id={index + "Div"} className="request">
          <TableBody request={request} columns={columns} index={index} />
          <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
            <DistributionListFields request={request} generateInputFieldsNow={generateInputFieldsNow} setGenerateInputFieldsNow={setGenerateInputFieldsNow} inputFieldNumber={request.addresses.length} />
          </div>
        </div>
      })}
    </Page>
  )
}

export default DistributionLists
