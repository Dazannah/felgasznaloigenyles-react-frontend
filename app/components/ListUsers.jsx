import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
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

function ListUsers() {
  const navigate = useNavigate()
  const initialState = useContext(StateContext)

  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState()
  const [getRequests, setGetRequests] = useState(true)
  const [userId, setUserId] = useState()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    async function getUsers() {
      const response = await Axios.get("/list-users", {
        headers: {
          authorization: `Bearer ${initialState.user.token}`
        }
      })
      setUsers(response.data)
      setIsLoading(false)
      setGetRequests(false)
    }

    getUsers()
  }, [getRequests])

  /*function handleUserIdSet(id, process) {
    setUserId([ id, process ])
  }*/

  useEffect(() => {
    async function handleUserId() {
      if (isInitialLoad) {
        setIsInitialLoad(false)
        return
      }
      const [id, process] = userId
      handleSubmit(id, process)
    }

    handleUserId()
  }, [userId])
  async function handleSubmit(id, process) {
    if (process === "delete") {
      const answer = confirm("Biztosan törölni akarod a felhasználót?")
      if (answer) submitRequest(id, process)
    } else {
      navigate(`/user/${id}/${process}`)
    }
  }

  async function submitRequest(id, process) {
    const result = await Axios.post(`/user/${id}/${process}`, {
      token: initialState.user.token
    })
    console.log(result)
  }

  const columns = [
    { label: "Név", accessor: "personalInformations.name" },
    { label: "Osztály", accessor: "personalInformations.className" },
    { label: "Számítógép felhasználónév", accessor: "userNames.adName" },
    { label: "E-mail cím", accessor: "userNames.eMail" },
    { label: "Érvényesség vége", accessor: "personalInformations.validTo" }
  ]

  if (isLoading)
    return (
      <Page title="Felhasználók listázása">
        <Loading />
      </Page>
    )

  if (users.length == 0) {
    return (
      <Page title="Felhasználók listázása">
        <TableHead columns={columns} setRequests={setUsers} requests={users} />
        Nincsennek felhasználók.
      </Page>
    )
  }

  return (
    <Page title="Felhasználók listázása">
      <TableHead columns={columns} setRequests={setUsers} requests={users} />
      {users.map(function (request, index) {
        return (
          <div key={request._id + "DivKey"} id={index + "Div"} className="request">
            <TableBody request={request} columns={columns} index={index} />
            <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
              <form>
                <UpperFields listOut={true} request={request} listUsers={true} setUserId={setUserId} />

                <Columns listOut={true} request={request} />
                <CreateNewTextarea listOut={true} request={request} />
                <TechnicalTextarea listOut={true} request={request} listUser={true} />

                <UserName listOut={true} request={request} />
              </form>
            </div>
          </div>
        )
      })}
    </Page>
  )
}

export default ListUsers
