import React, { useEffect, useState } from "react"

function DistributionListFields(props) {
  const [inputFields, setInputField] = useState([])

  useEffect(() => {
    function generateInputFields() {
      const inputFieldsTemp = []
      for (let i = 0; i < props.inputFieldNumber; i++) {
        inputFieldsTemp.push(
          <>
            <input id={i} {...(props.request ? { value: props.request.adresses[i], readOnly: true } : "")} name={`email${i}`} key={`${i}input`} type="text" />
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
    </>
  )
}

export default DistributionListFields
