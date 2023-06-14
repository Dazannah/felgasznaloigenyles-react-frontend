import React from "react"

function AllowTextarea(props) {
  return (
    <>
      <label>
        <input type="radio" name="permission" value="Engedélyezett" />
        Engedélyez
      </label>
      <label>
        <input type="radio" name="permission" value="Elutasított" />
        Elutasít
      </label>
      <br />
      <br />
      Megjegyzések:
      <textarea className="roundCorner textArea" id="textArea" name="notes" />
      <br />
      <br />
      <input type="hidden" name="ticketId" value={props.request._id} />
    </>
  )
}

export default AllowTextarea
