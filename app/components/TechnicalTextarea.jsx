import React, { useContext } from "react"

import FormDispatchContext from "../FormDispatchContext.jsx"

function Technical(props) {
  const formDispatch = useContext(FormDispatchContext)
  if (props.request.technical.isTechnical && props.request.technical.technicalTextArea.trim() != "") {
    return (
      <>
        Technikai fiók megjegyzés:
        <textarea {...(props.listOut ? { value: `${props.request.technical.technicalTextArea}`, readOnly: true } : "")} onChange={e => formDispatch({ type: "setTechnicalTextArea", value: e.target.value })} className="roundCorner textArea" id="createTextArea" name="createTextArea"></textarea>
        <br />
        <br />
        <br />
      </>
    )
  }
}

export default Technical
