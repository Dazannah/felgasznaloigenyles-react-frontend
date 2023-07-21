import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"

import Loading from "./Loading.jsx"
import TableHead from "./TableHead.jsx"
import TableBody from "./TableBody.jsx"
import DistributionListFields from "./DistributionListFields.jsx"
import RequestDetails from "./RequestDetails.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function ListDistributionListRequests(props){

const initialState = useContext(StateContext)
const appDispatch = useContext(DispatchContext)

const [isLoading, setIsLoading] = useState(true)
const [userRequests, setUserRequests] = useState([])

const [generateInputFieldsNow, setGenerateInputFieldsNow] = useState(true)

const columns = [
    { label: "Művelet", accessor: "process" },
    { label: "Engedélyezve", accessor: "permission.allowed" },
    { label: "Engedélyező", accessor: "permission.authorizedBy" },
    { label: "Igénylés ideje", accessor: "ticketCreation.createTime" },
    { label: "Lezárt", accessor: "completed.createTime" }
  ]

  useEffect(() => {
    async function getUserAllRequest() {
      try {
        const allRequest = await Axios.get(`/user/${props.userId}/requests`)

        setUserRequests(allRequest.data)
        setIsLoading(false)
      } catch (err) {
        showError(err, appDispatch)
      }
    }
    getUserAllRequest()
  }, [])

  if (isLoading) return <Loading />

  if (userRequests.length == 0)
    return (
      <>
        <TableHead columns={columns} setRequests={setUserRequests} requests={userRequests} userId={props.userId ? props.userId : false} collection={"requests"} status={"all"} />
        <span className="no-request-span">Nincs a feltételeknek megfelelő kérelem.</span>
      </>
    )

    return (
        <>
        <TableHead columns={columns} setRequests={setUserRequests} requests={userRequests} userId={props.userId ? props.userId : false} collection={"requests"} status={"all"} />
        {userRequests.map(function (request, index) {
            return(
                <div key={request._id + "DivKey"} id={request._id + index + "Div"} className="request">
                    <TableBody request={request} columns={columns} index={index + request._id} />
                    <div key={request._id + "contentKey"} id={index + request._id + "content"} className="collapsibleContent ">
                        <DistributionListFields request={request} generateInputFieldsNow={generateInputFieldsNow} setGenerateInputFieldsNow={setGenerateInputFieldsNow} inputFieldNumber={request.addresses.length} />
                        <RequestDetails request={request}/>
                    </div>
                </div>
            )
        })}
        </>
    )
}

    export default ListDistributionListRequests