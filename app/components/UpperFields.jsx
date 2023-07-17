import React, { useContext, useEffect } from "react"

import DropdownMenu from "./DropdownMenu.jsx"

import FormDispatchContext from "../FormDispatchContext.jsx"
import FormStateContext from "../FormStateContext.jsx"

function UpperFields(props) {
  const formState = useContext(FormStateContext)
  const formDispatch = useContext(FormDispatchContext)

  function handleProcessStart(id, process) {
    props.setUserId([id, process])
  }

  function handleChange(type, value) {
    formDispatch({ type, value })
  }

  useEffect(() => {
    if (props.listOut) {
      formDispatch({ type: "setClassName", value: props.request.personalInformations.className })
      formDispatch({ type: "setClassId", value: props.request.personalInformations.classId })
    }
  }, [])

  return (
    <div id="upper-fileds-wrapper">
      <div id="row" className="group">
        <div id="left-up">
          <div className="mini-container">
            <label htmlFor="name">
              <span>Név</span>
            </label>{" "}
            <br />
            <input
              autoComplete="off"
              className="round-corner"
              onChange={e => handleChange("setName", e.target.value)}
              type="text"
              id="name"
              name="name"
              {...(props.listOut
                ? {
                    defaultValue: `${props.request.personalInformations.name}`,
                    ...useEffect(() => {
                      handleChange("setName", props.request.personalInformations.name)
                    }, [])
                  }
                : "")}
              readOnly={props.readonly}
            />
          </div>

          <div className="mini-container">
            <label htmlFor="isTechnical">Technikai fiók</label>{" "}
            <input
              autoComplete="off"
              onChange={e => handleChange("setIsTechnical", e.target.value)}
              {...(props.listOut
                ? {
                    defaultChecked: props.request.technical.isTechnical,
                    ...useEffect(() => {
                      handleChange("setIsTechnical", props.request.technical.isTechnical)
                    }, [])
                  }
                : "")}
              disabled={props.listOut}
              id="isTechnical"
              type="checkbox"
            />
            <br />
          </div>

          <div className="mini-container">
            {props.classChoosable ? <DropdownMenu /> : "Osztály"} <br />
            <input autoComplete="off" className="round-corner" type="text" id="class" name="class" value={formState.className} readOnly />
            <input autoComplete="off" className="hidden-lable" type="text" id="classDbId" name="dbId" value={formState.classId} readOnly />
          </div>
        </div>

        <div id="right-up" className="group">
          <div className="mini-container">
            <label htmlFor="id">Nyilv. szám</label> <br />
            <input
              autoComplete="off"
              className="round-corner"
              onChange={e => handleChange("setTicketId", e.target.value)}
              type="text"
              id="id"
              name="id"
              {...(props.listOut
                ? {
                    defaultValue: props.request.personalInformations.ticketId,
                    ...useEffect(() => {
                      handleChange("setTicketId", props.request.personalInformations.ticketId)
                    }, [])
                  }
                : "")}
              readOnly={props.readonly}
            />
          </div>
          <div id="progress-container">
            {props.listUsers ? (
              <>
                {props.request.status === "active" ? (
                  <>
                    <button onClick={() => handleProcessStart(props.request._id, "edit")} className="user-edit-button roundCorner" type="button" id={props.request._id}>
                      Felhasználó jogosultság módosítása
                    </button>
                    <br />

                    <button onClick={() => handleProcessStart(props.request._id, "delete")} className="user-delete-button roundCorner" type="button" id={props.request._id}>
                      Felhasználó törlése
                    </button>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              <form autoComplete="off" key={props.request ? props.request + "radioButtonFormField" : "radioButtonFormField"}>
                <input autoComplete="off" type="radio" id="newUser" name="process" value="Új felhasználó" checked disabled />
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
            <input
              autoComplete="off"
              onChange={e => handleChange("setClassLeader", e.target.value)}
              type="text"
              id="classLeader"
              name="classLeader"
              {...(props.listOut
                ? {
                    defaultValue: `${props.request.personalInformations.classLeader}`,
                    ...useEffect(() => {
                      handleChange("setClassLeader", props.request.personalInformations.classLeader)
                    }, [])
                  }
                : "")}
              readOnly={props.readonly}
            />
          </div>
          <div className="mini-container">
            <label className="" htmlFor="workPost">
              Beosztás
            </label>
            <br />
            <input
              autoComplete="off"
              onChange={e => handleChange("setWorkPost", e.target.value)}
              type="text"
              id="workPost"
              name="workPost"
              {...(props.listOut
                ? {
                    defaultValue: `${props.request.personalInformations.workPost}`,
                    ...useEffect(() => {
                      handleChange("setWorkPost", props.request.personalInformations.workPost)
                    }, [])
                  }
                : "")}
              readOnly={props.readonly}
            />
          </div>
        </div>

        <div className="float-left-half">
          <div className="mini-container">
            <label className="" htmlFor="workLocation">
              Munkavégzés helye
            </label>
            <br />
            <input
              autoComplete="off"
              onChange={e => handleChange("setWorkLocation", e.target.value)}
              type="text"
              id="workLocation"
              name="workLocation"
              {...(props.listOut
                ? {
                    defaultValue: `${props.request.personalInformations.workLocation}`,
                    ...useEffect(() => {
                      handleChange("setWorkLocation", props.request.personalInformations.workLocation)
                    }, [])
                  }
                : "")}
              readOnly={props.readonly}
            />
          </div>

          <div id="dates">
            <div className="date-fields-from">
              <label className="" htmlFor="validFrom">
                Érvényesség kezdete
              </label>
              <br />
              <input autoComplete="off" className="date-fields" onChange={e => handleChange("setValidFrom", e.target.value)} type="datetime-local" id="validFrom" name="validFrom" {...(props.listOut ? { value: `${props.request.personalInformations.validFrom}`, readOnly: true } : "")} />
              <br />
            </div>
            <div className="date-field-to">
              <label htmlFor="validTo" {...(props.listOut ? { value: `${props.request.personalInformations.validTo}`, readOnly: true } : "")}>
                Érvényesség vége
              </label>
              <br />
              <input
                autoComplete="off"
                onChange={e => handleChange("setValidTo", e.target.value)}
                type="datetime-local"
                id="validTo"
                name="validTo"
                {...(props.listOut
                  ? {
                      defaultValue: `${props.request.personalInformations.validTo}`,
                      ...useEffect(() => {
                        handleChange("setTicketId", props.request.personalInformations.validTo)
                      }, [])
                    }
                  : "")}
                readOnly={props.readonly}
              />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpperFields
