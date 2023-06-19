import React, { useContext, useEffect, useState, useRef } from "react"
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

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"

function AllowedRequests(props) {
  const initialState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [allowedRequests, setAllowedRequests] = useState()
  const [isLoading, setIsloading] = useState(true)
  const [requests, setRequests] = useState(true)

  const formRef = useRef(null)

  const columns = [
    { label: "Név", accessor: "personalInformations.name" },
    { label: "Osztály", accessor: "personalInformations.className" },
    { label: "Nyilv. szám", accessor: "personalInformations.ticketId" },
    { label: "Művelet", accessor: "process" },
    { label: "Engedélyezve", accessor: "permission.permissionTime" },
    { label: "Engedélyező", accessor: "permission.authorizedBy" }
  ]

  useEffect(() => {
    async function getAllowedRequests() {
      const allowedRequests = await Axios.post("/get-allowed-tickets", {
        token: initialState.user.token
      })
      setAllowedRequests(allowedRequests.data)
      setIsloading(false)
      setRequests(false)
    }
    getAllowedRequests()
  }, [requests])

  async function submitHandle(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries())
    const leftColumnKeys = []
    const errors = []

    if (!values.done) {
      appDispatch({ type: "flashMessageWarning", value: '"Elkészítve" bepipálása kötelező.' })
    } else {
      const dataToSend = {}
      const userNames = {}
      const valuesKeys = Object.keys(values)

      initialState.arrays.leftColumn.forEach(element => {
        leftColumnKeys.push(element.name)
      })
      valuesKeys.forEach(element => {
        if (leftColumnKeys.includes(element)) {
          if (values[element] === "") {
            const index = leftColumnKeys.indexOf(element)

            errors.push(`${initialState.arrays.leftColumn[index].value} megadása kötelező.`)
          } else {
            userNames[element] = values[element]
          }
        } else {
          dataToSend[element] = values[element]
        }
      })

      if (errors.length > 0) {
        appDispatch({ type: "flashMessageWarning", value: errors })
      } else {
        dataToSend.userNames = userNames
        try {
          const result = await Axios.post("/close-new-user-ticket", {
            token: initialState.user.token,
            dataToSend
          })
          appDispatch({ type: "flashMessagesSuccess", value: "Felhasználó létrehozása sikeres." })
          setRequests(true)
        } catch (err) {
          appDispatch({ type: "flashMessageWarning", value: err.message })
        }
      }
    }
  }

  if (isLoading)
    return (
      <Page title="Engedélyezett kérelmek listázása">
        <Loading />
      </Page>
    )

  if (allowedRequests.length == 0) {
    return <Page title="Engedélyezett kérelmek listázása">Nincs engedélyezett kérelmek.</Page>
  }
  return (
    <Page title="Engedélyezett kérelmek listázása">
      <TableHead columns={columns} setRequests={setAllowedRequests} requests={allowedRequests} />
      {allowedRequests.map(function (request, index) {
        return (
          <>
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
                  <IsDone request={request} />
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

export default AllowedRequests
