import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"

import Loading from "./Loading.jsx"
import TableHead from "./TableHead.jsx"
import TableBody from "./TableBody.jsx"
import UpperFields from "./UpperFields.jsx"
import Columns from "./Columns.jsx"
import CreateNewTextarea from "./CreateNewTextarea.jsx"
import UserName from "./UserName.jsx"
import AllowTextarea from "./AllowTextarea.jsx"
import TechnicalTextarea from "./TechnicalTextarea.jsx"
import IsDone from "./IsDone.jsx"
import EditRequestTable from "./EditRequestTable.jsx"

import { showError } from "../utils.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function ListUserRequests(props) {
  const initialState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [isLoading, setIsLoading] = useState(true)
  const [userRequests, setUserRequests] = useState([])

  const columns = [
    { label: "Művelet", accessor: "process" },
    { label: "Engedélyezve", accessor: "permission.allowed" },
    { label: "Engedélyező", accessor: "permission.authorizedBy" },
    { label: "Igénylés ideje", accessor: "ticketCreation.createTime" },
    { label: "Lezárt", accessor: "completed.time" }
  ]

  useEffect(() => {
    async function getUserAllRequest() {
      try {
        const allRequest = await Axios.get(`/user/${props.userId}/requests`, {
          headers: {
            authorization: `Bearer ${initialState.user.token}`
          }
        })

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
        return (
          <div key={request._id + "DivKey"} id={request._id + index + "Div"} className="request">
            <TableBody request={request} columns={columns} index={request._id + index} />
            <div key={request._id + "contentKey"} id={request._id + index + "content"} className="collapsibleContent ">
              <UpperFields listOut={true} request={request} readonly={true} />
              <Columns listOut={true} request={request} readonly={true} />
              <EditRequestTable request={request} />
              <CreateNewTextarea listOut={true} request={request} readonly={true} />
              <TechnicalTextarea listOut={true} request={request} readonly={true} />

              <UserName listOut={true} request={request} />
              <AllowTextarea request={request} ticketContentId={`${index}contentKey`} readonly={true} />
              <IsDone listOut={true} request={request} readonly={true} />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ListUserRequests
