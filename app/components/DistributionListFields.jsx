import React, { useEffect, useState } from "react"

function DistributionListFields(props) {
  const [inputFields, setInputField] = useState([])

  useEffect(() => {
    function generateInputFields() {
      const inputFieldsTemp = []
      for (let i = 0; i < props.inputFieldNumber; i++) {
        inputFieldsTemp.push(
          <>
            <input id={i} {...(props.request ? { value: props.request.addresses[i], readOnly: true } : "")} name={`email${i}`} key={`${i}input`} type="text" />
            <br />
          </>
        )
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
          <input id="distribution-list-addy" {...(props.request ? { value: props.request.mainAddress, readOnly: true } : "")} name="distributionListAddy" type="text" />
          <br />
          <br />
          <label htmlFor="distribution-list-emails">E-mail cím:</label>
          <br />
          {inputFields.map(field => {
            return field
          })}
          <br />
        </div>

        <div>
          <form key={props.request ? props.request._id + "dLID" : "dLID"}>
            <input id="process" type="radio" name="process" disabled="true" checked="true" />
            <label htmlFor="process">{props.request ? props.request.process : "Új terjesztési lista"}</label>
          </form>
        </div>
      </div>
      <br />
    </>
  )
}

export default DistributionListFields
