import React, { useEffect, useState, useContext, useRef } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import Axios from "axios"

import DistributionListFields from "./DistributionListFields.jsx"
import Page from "./Page.jsx"
import Loading from "./Loading.jsx"

import StateContext from "../StateContext.jsx"
import DispatchContext from "../DispatchContext.jsx"

function EditDistributionList(props) {
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const { email } = useParams()
  const [initialLoad, setInitialLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const [distributionList, setDistributionList] = useState()
  const [inputFieldNumber, setInputFieldNumber] = useState(1)
  const [generateInputFieldsNow, setGenerateInputFieldsNow] = useState(true)
  const [fieldToAdd, setFieldToAdd] = useState(1)

  const formRef = useRef(null)

  useEffect(()=>{
    async function getDistributionList(){
        const response = await Axios.get(`/distribution-list/${email}/edit`)

        const responseObject = serializeResponse(response.data[0])
        setDistributionList(responseObject)
        setInputFieldNumber(responseObject.emailRedirects.length)

        setIsLoading(false)
        setInitialLoad(false)
    }
    if (initialLoad) getDistributionList()
  },[])

  function serializeResponse(data){
    const serializedData = {
      email: data.email,
      emailRedirects: []
    }

    data.emailRedirects.forEach(redirect =>{
      serializedData.emailRedirects.push([redirect, false])
    })

    return serializedData
  }

  function addField() {
    if (parseInt(fieldToAdd) > 0 && parseInt(fieldToAdd) < 1510) {
      setInputFieldNumber(inputFieldNumber + parseInt(fieldToAdd))
      setGenerateInputFieldsNow(true)
    }
  }

  function deleteField() {
    if (parseInt(fieldToAdd) > 0 && parseInt(fieldToAdd) < 1510) {
      if (inputFieldNumber - parseInt(fieldToAdd) > 1) {
        setInputFieldNumber(inputFieldNumber - parseInt(fieldToAdd))
        setGenerateInputFieldsNow(true)
      } else if (inputFieldNumber - parseInt(fieldToAdd) <= 1) {
        setInputFieldNumber(1)
        setGenerateInputFieldsNow(true)
      }
    }
  }

  function getFormData() {
    const formData = {}

    formData.distributionListAddy =  document.getElementById(`distribution-list-addy` + email).value
    for(let i = 0; i < inputFieldNumber; i++){
      const element = document.getElementById(`${email}` + i)
      formData[`email${i}`] = element.value
    }

    return formData
  }

  async function validateData(dataToValidate) {
    const error = []
    if (dataToValidate.distributionListAddy == "") {
      appDispatch({ type: "flashMessageWarning", value: "Terjesztési lista cím megadása kötelező." })
      return
    }

    for (let i = 0; i < inputFieldNumber; i++) {
      if (dataToValidate[`email${i}`] == "") error.push(`${i + 1}. email címet meg kell adni.`)
    }

    if (error.length > 0) {
      appDispatch({ type: "flashMessageWarning", value: error })
      return
    }

    return dataToValidate
  }

  async function sendData(ditributionlist) {
    try {
      const response = await Axios.post(`/distribution-list/edit`, {
        ditributionlist
      })

      return response
    } catch (err) {
      let message
      
      if(err.response.status === 403){
        message = "Nincs jogosultságod terjesztési lista létrehozásához."
      }else{
        message = JSON.stringify(err)
      }

      appDispatch({ type: "flashMessageWarning", value:  message})
    }
  }

  function serializeData(validatedData, distributionList){
    let counter = -1

    for(const email in validatedData){
      if(email != "distributionListAddy"){
        if(distributionList.emailRedirects[counter] == null){
          distributionList.emailRedirects.push([validatedData[email], "new"])
        }
      }
      counter++
    }

    return distributionList
  }

  async function submitHandler(e) {
    e.preventDefault()
    const dataToSendTmp = getFormData()

    const validatedData = await validateData(dataToSendTmp)

    if(!validatedData) return

    const dataToSend = serializeData(validatedData, distributionList)

    if (dataToSend) {
      const response = await sendData(dataToSend)
      if (response.data.errors) {
        appDispatch({ type: "flashMessageWarning", value: response.data.errors })
      } else {
        appDispatch({ type: "flashMessageSuccess", value: "Terjesztési lista módosítása sikeres." })
        navigate(`/distribution-lists`)
      }
    }
  }

  if(isLoading){
    return(
        <Page title={`${email} módosítása`}>
            <Loading />
        </Page>
    )
  }

  return (
    <Page title={`${email} módosítása`}>
      <div id="create-distribution-list-div">
        <div id="create-distribution-list-upper-buttons">
          <span>Üres mezők hozzáadása/törlése</span> <br />
          <input defaultValue={fieldToAdd} onChange={e => setFieldToAdd(e.target.value)} type="number" />
          <br />
          <button className="form-submit-input round-corner" type="button" id="addElement" onClick={addField}>
            Hozzáadás
          </button>{" "}
          <button className="form-submit-input round-corner" type="button" id="addElement" onClick={deleteField}>
            Törlés
          </button>
        </div>
        <form onSubmit={e => e.preventDefault()} ref={formRef}>
          <DistributionListFields
          request={distributionList} setRequest={setDistributionList} isEdit={true} generateInputFieldsNow={generateInputFieldsNow} setGenerateInputFieldsNow={setGenerateInputFieldsNow} inputFieldNumber={inputFieldNumber} distributionlistEmail={distributionList.email} distributionlistRedirects={distributionList.emailRedirects} />
          <button onClick={e => submitHandler(e)} className="form-submit-input round-corner" type="submit" value="Küldés">
            Mentés
          </button>
          {" "}

          <Link key="distributionLists" to="/distribution-lists">
            <button className="form-submit-input round-corner">
              Mégse
            </button>
          </Link>


        </form>
      </div>
    </Page>
  )
}

export default EditDistributionList
