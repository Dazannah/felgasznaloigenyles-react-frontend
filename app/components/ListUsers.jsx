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
import Loading from "./Loading.jsx"
import TechnicalTextarea from "./TechnicalTextarea.jsx"
import ListUserRequests from "./ListUserRequests.jsx"
import ToggleSwitch from "./utils/ToggleSwitch.jsx"

import { showError } from "../utils.jsx"

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"

function ListUsers() {
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const initialState = useContext(StateContext)

  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState()
  const [userId, setUserId] = useState()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const [toggleSwitchValue, setToggleSwitchValue] = useState(false)
  const [isRequestLoading, setIsRequestLoading] = useState(false)

  useEffect(() => {
    async function getUsers() {
      let url

      isInitialLoad ? "" : setIsRequestLoading(true)

      toggleSwitchValue ? (url = "/list-deleted-users") : (url = "/list-active-users")
      const response = await Axios.get(`${url}`, {
        headers: {
          authorization: `Bearer ${initialState.user.token}`
        }
      })
      setUsers(response.data)
      isInitialLoad ? setIsLoading(false) : setIsRequestLoading(false)
    }
    getUsers()
  }, [toggleSwitchValue])

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
    try {
      const result = await Axios.post(`/user/${id}/${process}`, {}, { headers: { authorization: `Bearer ${initialState.user.token}` } })
      if (result.data.acknowledged) {
        appDispatch({ type: "flashMessageSuccess", value: "Törlési kérelem sikeresen mentve." })
      } else {
        appDispatch({ type: "flashMessageWarning", value: result.data })
      }
    } catch (err) {
      showError(err, appDispatch)
    }
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
        <ToggleSwitch setToggleSwitchValue={setToggleSwitchValue} toggleSwitchTexts={{ title: "Felhasználók státusza", left: "Aktív", right: "Törölt" }} />
        <TableHead columns={columns} setRequests={setUsers} requests={users} collection={"users"} status={toggleSwitchValue ? "deleted" : "active"}/>
        <div className="no-request-div">
          <span className="no-request-span">{toggleSwitchValue ? "Nincsennek törölt felhasználók." : "Nincsennek felhasználók."}</span>
        </div>
      </Page>
    )
  }
  console.log(toggleSwitchValue)
  return (
    <Page title="Felhasználók listázása">
      <ToggleSwitch setToggleSwitchValue={setToggleSwitchValue} toggleSwitchTexts={{ title: "Felhasználók státusza", left: "Aktív", right: "Törölt" }} />
      <TableHead columns={columns} setRequests={setUsers} requests={users} collection={"users"} status={toggleSwitchValue ? "deleted" : "active"}/>
      {isRequestLoading ? (
        <Loading />
      ) : (
        users.map(function (request, index) {
          return (
            <div key={request._id + "DivKey"} id={index + "Div"} className="request">
              <TableBody request={request} columns={columns} index={index} />
              <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
                <form>
                  <UpperFields listOut={true} request={request} listUsers={true} setUserId={setUserId} readonly={true} />
                  <Columns listOut={true} request={request} />
                  <CreateNewTextarea listOut={true} request={request} />
                  <TechnicalTextarea listOut={true} request={request} listUser={true} />
                  <UserName listOut={true} request={request} />
                  <ListUserRequests userId={request._id} />
                </form>
              </div>
            </div>
          )
        })
      )}
    </Page>
  )
}

export default ListUsers
