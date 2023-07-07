import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function CreateDistributionList(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [inputFieldNumber, setInputFieldNumber] = useState(1)
  const [generateInputFieldsNow, setGenerateInputFieldsNow] = useState(true)
  const [inputFields, setInputField] = useState([])
  const [fieldToAdd, setFieldToAdd] = useState(1)

  useEffect(()=>{
    function generateInputFields() {
      const inputFieldsTemp = []
      for (let i = 0; i < inputFieldNumber; i++) {
        inputFieldsTemp.push(
          <>
            <input id={i} name={`email${i}`} key={`${i}input`} type="text" />
            <br />
          </>
        )
      }
      setInputField(inputFieldsTemp)
    }

    generateInputFields()
    setGenerateInputFieldsNow(false)
  },[generateInputFieldsNow])


  function addField() {
    if(parseInt(fieldToAdd)>0 && parseInt(fieldToAdd) < 150){
      setInputFieldNumber(inputFieldNumber + parseInt(fieldToAdd))
      setGenerateInputFieldsNow(true)
    }

  }

  function deleteField() {
    if(parseInt(fieldToAdd)>0 && parseInt(fieldToAdd) < 150){
      if(inputFieldNumber - parseInt(fieldToAdd) > 1){
        setInputFieldNumber(inputFieldNumber - parseInt(fieldToAdd))
        setGenerateInputFieldsNow(true)
      }else if(inputFieldNumber - parseInt(fieldToAdd) <= 1){
        setInputFieldNumber(1)
        setGenerateInputFieldsNow(true)
      }
    }


  }

  function getFormData(e){
    const formData = new FormData(e.target)
    const values = Object.fromEntries(formData.entries())

    return values
  }

  async function validateData(dataToValidate){
    const error = []
    if(dataToValidate.distributionListAddy == ""){
      appDispatch({ type: "flashMessageWarning", value: "Terjesztési lista cím megadása kötelező." })
      return
    }

    for(let i = 0; i<inputFieldNumber; i++){
      if(dataToValidate[`email${i}`] == "") error.push(`${i+1}. email címet meg kell adni.`)
    }

    if(error.length > 0){
      appDispatch({ type: "flashMessageWarning", value: error })
      return
    }

    return dataToValidate

  }

  async function sendData(dataToSend){
    try{
      const response = await Axios.post(
        "/create-new-distribution-list",
        {
          dataToSend,
          eMailFieldNumber: inputFieldNumber
        },
        {
          headers: {
            authorization: `Bearer ${appState.user.token}`
          }
        }
      )

      return response

    }catch(err){
      appDispatch({ type: "flashMessageWarning", value: JSON.stringify(err) })
    }
  }

  async function submitHandler(e) {
    e.preventDefault()
    const dataToSendTmp = getFormData(e)
    const dataToSend = await validateData(dataToSendTmp)

    if(dataToSend){
      const response = await sendData(dataToSend)

      if(response.data.errors){
        appDispatch({ type: "flashMessageWarning", value: response.data.errors })
      }else{
        appDispatch({ type: "flashMessageSuccess", value: "Terjesztési lista igénylés létrehozása sikeres." })
      }
    }

  }

  return (
    <div id="create-distribution-list-div">
      <div id="create-distribution-list-upper-buttons">
        <input defaultValue={fieldToAdd} onChange={e => setFieldToAdd(e.target.value)} type="number" /> <br />
        <button className="form-submit-input round-corner" type="button" id="addElement" onClick={addField}>
          Hozzáadás
        </button>{" "}
        <button className="form-submit-input round-corner" type="button" id="addElement" onClick={deleteField}>
          Törlés
        </button>
      </div>
      <form onSubmit={e => submitHandler(e)}>
        <label for="distribution-list">Terjesztési lista címe:</label>
        <br />
        <input id="distribution-list-addy" name="distributionListAddy" type="text" />
        <br />
        <br />
        <label for="distribution-list-emails">E-mail cím:</label>
        <br />
        {inputFields.map(field =>{
          return field
        })}

        <br />
        <button className="form-submit-input round-corner" type="submit" value="Küldés">
          Küldés
        </button>
      </form>
    </div>
  )
}

export default CreateDistributionList
