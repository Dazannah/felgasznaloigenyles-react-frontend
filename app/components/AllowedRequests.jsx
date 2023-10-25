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
import DistributionListFields from "./DistributionListFields.jsx"
import EditRequestTable from "./EditRequestTable.jsx"
import Pages from "./Pages.jsx"

import { showError } from "../utils.jsx"

import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"

function AllowedRequests(props) {
  const initialState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [allowedRequests, setAllowedRequests] = useState()
  const [isLoading, setIsloading] = useState(true)
  const [requests, setRequests] = useState(true)

  const [from, setFrom] = useState(0)
  const [displayNumber, setDisplayNumber] = useState(10)

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
    if (requests) {
      async function getAllowedRequests() {
        try {
          const allowedRequests = await Axios.get("/get-allowed-tickets")
          setRequests(false)
          setAllowedRequests(allowedRequests.data)
          setIsloading(false)
        } catch (err) {
          showError(err, appDispatch)
        }
      }
      getAllowedRequests()
    }
  }, [requests])

  async function submitHandle(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries())

    if(values.process === "update") {
      const { errors, dataToSend, userNames } = handleFields(values)

      return await sendUpdateRequest(dataToSend, userNames)
}

    if (!values.done) {
      appDispatch({ type: "flashMessageWarning", value: '"Elkészítve" bepipálása kötelező.' })
    } else {
      if (values.process === "Felhasználó törlése") {
        sendDeleteRequest(values)
      } else if (values.process === "Felhasználó módosítása") {
        const { errors, dataToSend, userNames } = handleFields(values)

        if (errors.length > 0) {
          appDispatch({ type: "flashMessageWarning", value: errors })
        } else {
          dataToSend.userNames = userNames
          sendEditRequest(dataToSend)
        }
      } else {
        const { errors, dataToSend, userNames } = handleFields(values)

        if (errors.length > 0) {
          appDispatch({ type: "flashMessageWarning", value: errors })
        } else if (dataToSend.ticketType === "distributionList") {
          distributionListRequest(dataToSend)
        } else {
          dataToSend.userNames = userNames
          sendRequestWithFields(dataToSend)
        }
      }
    }
  }

  async function sendUpdateRequest(dataToSend, userNames){
    try {
      const result = await Axios.post("/update-user-request", {
        dataToSend,
        userNames
      })
      appDispatch({ type: "flashMessageSuccess", value: "Mentés sikeres." })
      setRequests(true)
    } catch (err) {
      showError(err, appDispatch)
    }
  }

  function processToUpdate(updateFieldId){
    document.getElementById(updateFieldId).value = "update"
  }

  function handleFields(values) {
    const leftColumnKeys = []
    const errors = []
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
    return { errors, dataToSend, userNames }
  }

  async function sendRequestWithFields(dataToSend) {
    try {
      const result = await Axios.post("/close-new-user-ticket", {
        dataToSend
      })
      appDispatch({ type: "flashMessageSuccess", value: "Felhasználó létrehozása sikeres." })
      setRequests(true)
    } catch (err) {
      showError(err, appDispatch)
    }
  }

  async function sendDeleteRequest(values) {
    try {
      const result = await Axios.post("/close-delete-user-request", {
        values
      })
      appDispatch({ type: "flashMessageSuccess", value: result.data })
      setRequests(true)
    } catch (err) {
      showError(err, appDispatch)
    }
  }

  async function sendEditRequest(dataToSend) {
    try {
      const result = await Axios.post("/close-edit-user-request", { dataToSend })
      appDispatch({ type: "flashMessageSuccess", value: result.data })
      setRequests(true)
    } catch (err) {
      showError(err, appDispatch)
    }
  }

  async function distributionListRequest(dataToSend) {
    try {
      const result = await Axios.post("/close-distribution-list-create-request", {
        dataToSend
      })

      appDispatch({ type: "flashMessageSuccess", value: result.data })
      setRequests(true)
    } catch (err) {
      showError(err, appDispatch)
    }
  }

  function generateUserRequest(request, index) {
    return (
      <div key={request._id + "DivKey"} id={index + "Div"} className="request">
        <TableBody request={request} columns={columns} index={index} />
        <div key={request._id + "contentKey"} id={index + "content"} className="collapsibleContent ">
          <UpperFields listOut={true} request={request} readonly={true} />
          <Columns listOut={true} request={request} />
          <EditRequestTable request={request} />
          <CreateNewTextarea listOut={true} request={request} />
          <TechnicalTextarea listOut={true} request={request} />
          <form key={request._id + "form"} onSubmit={submitHandle} ref={formRef}>
            <UserName request={request} />
            <AllowTextarea request={request} ticketContentId={`${index}contentKey`} />
            <IsDone request={request} />
            <input key={request._id + "ticketIdInput"} type="hidden" name="ticketId" value={request._id} />
            <input id={request._id + "process"} key={request._id + "process"} type="hidden" name="process" value={request.process} />
            <input key={request._id + "submit"} type="submit" className="form-submit-input round-corner" value="Küldés" />{" "}
            <input key={request._id + "updateTicket"} type="submit" onClick={() => processToUpdate(request._id + "process")} className="form-submit-input round-corner" value="Mentés" />
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
          <form key={request._id + "form"} onSubmit={submitHandle} ref={formRef}>
            <AllowTextarea request={request} ticketContentId={`${index}contentKey`} />
            <IsDone request={request} />
            <input key={request._id + "ticketType"} type="hidden" name="ticketType" value="distributionList" />
            <input key={request._id + "ticketIdInput"} type="hidden" name="ticketId" value={request._id} />
            <input key={request._id + "submit"} type="submit" className="form-submit-input round-corner" value="Küldés" />
          </form>
        </div>
      </div>
    )
  }

  if (isLoading)
    return (
      <Page title="Engedélyezett kérelmek listázása">
        <Loading />
      </Page>
    )

  if (allowedRequests.length == 0) {
    return (
      <Page title="Engedélyezett kérelmek listázása">
        <TableHead columns={columns} setRequests={setAllowedRequests} requests={allowedRequests} collection={"requests"} status={"allowedRequests"} />
        <div className="no-request-div">
          <span className="no-request-span">Nincs engedélyezett kérelem.</span>
        </div>
      </Page>
    )
  }
  return (
    <Page title="Engedélyezett kérelmek listázása">
      <TableHead columns={columns} setRequests={setAllowedRequests} requests={allowedRequests} collection={"requests"} status={"allowedRequests"} />
      {allowedRequests.slice(from, from + displayNumber).map(function (request, index) {
        return request.mainAddress ? generateDistributionList(request, index) : generateUserRequest(request, index)
      })}
      <Pages from={from} setFrom={setFrom} displayNumber={displayNumber} setDisplayNumber={setDisplayNumber} arrayLength={allowedRequests.length} />
    </Page>
  )
}

export default AllowedRequests
