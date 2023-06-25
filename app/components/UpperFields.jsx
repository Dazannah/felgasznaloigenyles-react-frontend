import React, { useContext } from "react"

import DropdownMenu from "./DropdownMenu.jsx"

import FormDispatchContext from "../FormDispatchContext.jsx"
import FormStateContext from "../FormStateContext.jsx"

function UpperFields(props) {
  const formState = useContext(FormStateContext)
  const formDispatch = useContext(FormDispatchContext)

  function handleProcessStart(id, process) {
    props.setUserId([id, process])
  }

  return (
    <div id="upper-fileds-wrapper">
      <div id="row" className="group">
        <div id="left-up">
          <div className="mini-container">
            <label htmlFor="name">
              <span>Név</span>
            </label>{" "}
            <br />
            <input className="round-corner" onChange={e => formDispatch({ type: "setName", value: e.target.value })} type="text" id="name" name="name" {...(props.listOut ? { defaultValue: `${props.request.personalInformations.name}` } : "")} readOnly={props.readonly} />
          </div>

          <div className="mini-container">
            <label htmlFor="isTechnical">Technikai fiók</label> <input onChange={e => formDispatch({ type: "setIsTechnical", value: e.target.checked })} {...(props.listOut ? { defaultChecked: props.request.technical.isTechnical } : "")} disabled={props.readOnly} id="isTechnical" type="checkbox" />
            <br />
          </div>

          <div className="mini-container">
            {props.classChoosable ? <DropdownMenu /> : "Osztály"} <br />
            <input className="round-corner" type="text" id="class" name="class" defaultValue={formState.className} readOnly {...(props.listOut ? { defaultValue: `${props.request.personalInformations.className}` } : "")} />
            <input className="hidden-lable" type="text" id="classDbId" name="dbId" {...(props.listOut ? { defaultValue: `${props.request.personalInformations._id}` } : { value: formState.classId })} readOnly />
          </div>
        </div>

        <div id="right-up" className="group">
          <div className="mini-container">
            <label htmlFor="id">Nyilv. szám</label> <br />
            <input className="round-corner" onChange={e => formDispatch({ type: "setTicketId", value: e.target.value })} type="text" id="id" name="id" {...(props.listOut ? { defaultValue: `${props.request.personalInformations.ticketId}` } : "")} readOnly={props.readonly} />
          </div>
          <div id="progress-container">
            {props.listUsers ? (
              <>
                <button onClick={() => handleProcessStart(props.request._id, "edit")} className="userEdit roundCorner btn" type="button" id={props.request._id}>
                  Felhasználó jogosultság módosítása
                </button>

                <button onClick={() => handleProcessStart(props.request._id, "delete")} className="userDelete roundCorner btn" type="button" id={props.request._id}>
                  Felhasználó törlése
                </button>
              </>
            ) : (
              <form>
                <input type="radio" id="newUser" name="process" value="Új felhasználó" checked disabled />
                <label htmlFor="newUser">{props.request ? props.request.process || "Felhasználó módosítása" : "Új felhasználó"}</label>
              </form>
            )}
          </div>
        </div>
      </div>
      <div id="middle" className="group">
        <div className="float-left-half">
          <div className="mini-container">
            <label className="" htmlFor="classLeader">
              Osztályvezető
            </label>
            <br />
            <input onChange={e => formDispatch({ type: "setClassLeader", value: e.target.value })} type="text" id="classLeader" name="classLeader" {...(props.listOut ? { defaultValue: `${props.request.personalInformations.classLeader}` } : "")} readOnly={props.readonly} />
          </div>
          <div className="mini-container">
            <label className="" htmlFor="workPost">
              Beosztás
            </label>
            <br />
            <input onChange={e => formDispatch({ type: "setWorkPost", value: e.target.value })} type="text" id="workPost" name="workPost" {...(props.listOut ? { defaultValue: `${props.request.personalInformations.workPost}` } : "")} readOnly={props.readonly} />
          </div>
        </div>

        <div className="float-left-half">
          <div className="mini-container">
            <label className="" htmlFor="workLocation">
              Munkavégzés helye
            </label>
            <br />
            <input onChange={e => formDispatch({ type: "setWorkLocation", value: e.target.value })} type="text" id="workLocation" name="workLocation" {...(props.listOut ? { defaultValue: `${props.request.personalInformations.workLocation}` } : "")} readOnly={props.readonly} />
          </div>

          <div id="dates">
            <div className="date-fields-from">
              <label className="" htmlFor="validFrom">
                Érvényesség kezdete
              </label>
              <br />
              <input className="date-fields" onChange={e => formDispatch({ type: "setValidFrom", value: e.target.value })} type="datetime-local" id="validFrom" name="validFrom" {...(props.listOut ? { value: `${props.request.personalInformations.validFrom}`, readOnly: true } : "")} />
              <br />
            </div>
            <div className="date-field-to">
              <label htmlFor="validTo" {...(props.listOut ? { value: `${props.request.personalInformations.validTo}`, readOnly: true } : "")}>
                Érvényesség vége
              </label>
              <br />
              <input onChange={e => formDispatch({ type: "setValidTo", value: e.target.value })} type="datetime-local" id="validTo" name="validTo" {...(props.listOut ? { defaultValue: `${props.request.personalInformations.validTo}` } : "")} readOnly={props.readonly} />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpperFields
