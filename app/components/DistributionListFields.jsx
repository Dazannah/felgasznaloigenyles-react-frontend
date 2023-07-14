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
          <label for="distribution-list">Terjesztési lista címe:</label>
          <br />
          <input id="distribution-list-addy" {...(props.request ? { value: props.request.mainAddress, readOnly: true } : "")} name="distributionListAddy" type="text" />
          <br />
          <br />
          <label for="distribution-list-emails">E-mail cím:</label>
          <br />
          {inputFields.map(field => {
            return field
          })}
          <br />
        </div>

        <div>
          <input id="process" type="radio" name="process" disabled="true" checked="true" {...(props.request ? { defaultValue: props.request.process } : { defaultValue: "Új terjesztési lista" })} />
          <label htmlFor="process">{props.request ? props.request.process : "Új terjesztési lista"}</label>
        </div>
      </div>
      <br />
    </>
  )
}

export default DistributionListFields
