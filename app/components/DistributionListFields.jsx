import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"

import { showError } from "../utils.jsx"

import DispatchContext from "../DispatchContext.jsx"

function DistributionListFields(props) {
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)

  function setInactive(number){
    const tmp = props.request
    tmp.emailRedirects[number][1]=true
    props.setRequest(tmp)
    props.setGenerateInputFieldsNow(true)
  }

  function undoInactive(number){
    const tmp = props.request
    tmp.emailRedirects[number][1]=false
    props.setRequest(tmp)
    props.setGenerateInputFieldsNow(true)
  }

  function isItDisabled(i){
    if(props.request?.emailRedirects.length > i && props.isEdit){
      return props.request?.emailRedirects[i][1]
    }else{
      return false
    }
  }

  function getFieldValue(i){
    try{
      if(props.isEdit){
        if(Array.isArray(props.request?.emailRedirects)){
          return props.request?.emailRedirects[i][0]
        }else{
          return props.request?.emailRedirects[i]
        }
      }else{
        if(Array.isArray(props.request?.emailRedirects[i])){
          return props.request?.emailRedirects[i][0]
        }else{
          return props.request?.emailRedirects[i]
        }
      }
    }catch(err){
      return null
    }
  }

  function modification(value){
    if(value[1] === true){
      return (
        <>
          <span style={{color: "red", fontWeight: "bold"}}> Törlés</span>
        </>
      )
    }else if(value[1] === "new"){
      return (
        <>
          <span style={{color: "green", fontWeight: "bold"}}> Hozzáadás</span>
        </>
      )
    }else{
      return ""
    }
  }

  function showButtons(i){
    return getFieldValue(i) === null
  }

  function getTheShit(i){
    try{
      return props.request?.emailRedirects[i][1] === false
    }catch(err){
      return true
    }
  }
  const [inputFields, setInputField] = useState([])
  useEffect(() => {
    function generateInputFields() {
      const inputFieldsTemp = []
      if(props.request?.specialFilter){
        inputFieldsTemp.push(
          <>
            <textarea rows="10" cols="60" id={props.request.mailuser_id} {...(props.request ? { readOnly: true } : "")} name={`email${props.request.mailuser_id}`} key={`${props.request.mailuser_id}input`} type="text">
              {props.isEdit ? props.request.emailRedirects[0][0] : props.request.emailRedirects[0]}
            </textarea>
            <br />
          </>
        )
      }else{
        for (let i = 0; i < props.inputFieldNumber; i++) {
            inputFieldsTemp.push(
              <>
                {/*props.request?.emailRedirects[i][1] === false*/ getTheShit(i) && !props.isEdit ? ""
                :
                <input style={isItDisabled(i) && props.isEdit ? {color: "red", textDecoration: "line-through"} : {}} disabled={isItDisabled(i) ? "disabled": ""} id={props.request?.email+i} {...(props.request ? { value: getFieldValue(i) } : "")} name={`email${i}`} key={`${i}input`} type="text" />}
                {(Array.isArray(props.request?.emailRedirects[i]) && !props.isEdit) ? modification(props.request?.emailRedirects[i]) : ""}
                {" "}
                {
                  props.isEdit ?
                    showButtons(i) ?
                        ""
                        :
                        isItDisabled(i) ? <button onClick={()=>undoInactive(i)} className="form-submit-input round-corner">Mégsem</button>
                          :
                        <button onClick={()=>setInactive(i)} className="form-submit-input round-corner">Eltávolítás</button>
                  :
                    ""
                }
              <br />
              </>
            )
          }
      }

      setInputField(inputFieldsTemp)
    }

    generateInputFields()
    props.setGenerateInputFieldsNow(false)
  }, [props.generateInputFieldsNow])

  async function sendDelete(email, emails){
    const answer = confirm(`Biztosan törölni akarod a/az ${email} című terjesztési listát?`)

    if(answer){
      try{
        const result = await Axios.post(`/delete-distributionlist`, {toDelete: email, emails})
  
        if (result.data.acknowledged) {
          appDispatch({ type: "flashMessageSuccess", value: "Sikeres törlés" })
          props.setGetRequests(true)
        } else {
          appDispatch({ type: "flashMessageWarning", value: "Sikertelen törlés" })
        }
      }catch(err){
        showError(err, appDispatch)
      }
    }
  }

  function edit(email){
    navigate(`/distribution-list/${email}/edit`)
  }

  return (
    <>
      <div className="distribution-list-wrapper">
        <div>
          <label htmlFor="distribution-list">Terjesztési lista címe:</label>
          <br />
          <input id={`distribution-list-addy${props.request?.email}`} {...(props.request ? { value: props.request.email, readOnly: true } : "")} name="distributionListAddy" type="text" />
          <br />
          <br />
          <label htmlFor="distribution-list-emails">E-mail cím:</label>
          <br />
          {inputFields.map(field => {
            return field
          })}
          <br />
        </div>
        {props.request?.email ? props.showButtons ?(
          <div id="progress-container">
              <button onClick={() => edit(props.request.email)} className="user-edit-button roundCorner" type="button" id={props.request.email}>
                Címek hozzáadása/eltávolítása
              </button>
              <br />

              <button onClick={() => sendDelete(props.request.email, props.request.emailRedirects)} className="user-delete-button roundCorner" type="button" id={props.request.email}>
                Fő cím törlése
              </button>
          </div>
        ):"":""}
      </div>
      <br />
    </>
  )
}

export default DistributionListFields
