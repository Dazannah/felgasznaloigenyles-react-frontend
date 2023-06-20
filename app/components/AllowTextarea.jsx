import React from "react"

function AllowTextarea(props) {
  const isAllowed = getValue("Engedélyezett")
  const isDenied = getValue("Elutasított")

  function getValue(permission) {
    if (props.request.permission) {
      return props.request.permission.allowed == permission
    }
  }

  return (
    <>
      <label>
        <input {...(props.request.permission ? { disabled: true, defaultChecked: isAllowed } : "")} type="radio" name="permission" value="Engedélyezett" />
        Engedélyez
      </label>
      <label>
        <input {...(props.request.permission ? { disabled: true, defaultChecked: isDenied } : "")} type="radio" name="permission" value="Elutasított" />
        Elutasít
      </label>

      <br />
      <br />
      <span {...(props.request.permission ? (props.request.permission.permissionNote == "" ? { hidden: true } : "") : "")}>Megjegyzések:</span>
      <textarea {...(props.request.permission ? (props.request.permission.permissionNote != "" ? { value: props.request.permission.permissionNote, readOnly: true } : { hidden: true }) : "")} className="roundCorner textArea" id="textArea" name="notes" />
      <br />
      <br />
    </>
  )
}

export default AllowTextarea
