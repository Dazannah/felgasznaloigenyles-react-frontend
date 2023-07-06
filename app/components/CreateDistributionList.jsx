import React, { useState } from "react"

function CreateDistributionList(props) {
  const [inputFieldNumber, setInputFieldNumber] = useState(1)
  const [fieldToAdd, setFieldToAdd] = useState(1)

  function generateInputFields() {
    const inputFields = []
    for (let i = 0; i < inputFieldNumber; i++) {
      inputFields.push(
        <>
          <input id={i} key={`${i}input`} type="text" />
          <br />
        </>
      )
    }
    return inputFields
  }

  function addField() {
    console.log(inputFieldNumber + parseInt(fieldToAdd))
    setInputFieldNumber(inputFieldNumber + fieldToAdd)
  }

  function deleteField() {
    if (inputFieldNumber - fieldToAdd <= 1 && inputFieldNumber - fieldToAdd > 0) {
      setInputFieldNumber(inputFieldNumber - 1)
    } else if (inputFieldNumber - fieldToAdd > 1) {
      setInputFieldNumber(inputFieldNumber - fieldToAdd)
    }
  }

  async function submitHandler(e) {
    e.preventDefault()
    console.log(e)
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
        <input id="distribution-list-addy" type="text" />
        <br />
        <br />
        <label for="distribution-list-emails">E-mail cím:</label>
        <br />
        {generateInputFields()}

        <br />
        <button className="form-submit-input round-corner" id="createDistributionListButton" type="submit" value="Küldés">
          Küldés
        </button>
      </form>
    </div>
  )
}

export default CreateDistributionList
