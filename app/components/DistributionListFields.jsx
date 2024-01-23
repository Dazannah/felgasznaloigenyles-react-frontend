import React, { useEffect, useState } from "react"

function DistributionListFields(props) {
  const [inputFields, setInputField] = useState([])
  useEffect(() => {
    function generateInputFields() {
      const inputFieldsTemp = []
      if(props.request.specialFilter){
        inputFieldsTemp.push(
          <>
            <textarea rows="10" cols="60" id={props.request.mailuser_id} {...(props.request ? { readOnly: true } : "")} name={`email${props.request.mailuser_id}`} key={`${props.request.mailuser_id}input`} type="text">
              {props.request.emailRedirects}
            </textarea>
            <br />
          </>
        )
      }else{
        for (let i = 0; i < props.inputFieldNumber; i++) {
            inputFieldsTemp.push(
              <>
                <input id={props.request.email+i} {...(props.request ? { value: props.request.emailRedirects[i], readOnly: true } : "")} name={`email${i}`} key={`${i}input`} type="text" />
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

  return (
    <>
      <div className="distribution-list-wrapper">
        <div>
          <label htmlFor="distribution-list">Terjesztési lista címe:</label>
          <br />
          <input id={`distribution-list-addy${props.request.email}`} {...(props.request ? { value: props.request.email, readOnly: true } : "")} name="distributionListAddy" type="text" />
          <br />
          <br />
          <label htmlFor="distribution-list-emails">E-mail cím:</label>
          <br />
          {inputFields.map(field => {
            return field
          })}
          <br />
        </div>
      </div>
      <br />
    </>
  )
}

export default DistributionListFields
