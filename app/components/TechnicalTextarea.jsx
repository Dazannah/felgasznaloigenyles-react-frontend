import React, { useContext } from "react"

import FormDispatchContext from "../FormDispatchContext.jsx"

function Technical(props) {
  const formDispatch = useContext(FormDispatchContext)
  const showTextArea = props.request ? props.request.technical.isTechnical && props.request.technical.technicalTextArea.trim() != "" : true

  if (showTextArea) {
    return (
      <>
        Technikai fiók megjegyzés:
        <textarea {...(props.listOut ? { value: `${props.request.technical.technicalTextArea}`, readOnly: true } : "")} onChange={e => formDispatch({ type: "setTechnicalTextArea", value: e.target.value })} className="round-corner text-area" id="technicalTextArea" name="technicalTextArea"></textarea>
        <br />
        <br />
        <br />
      </>
    )
  }
}

export default Technical
