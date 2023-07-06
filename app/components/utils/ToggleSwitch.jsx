import React, { useEffect } from "react"

function ToggleSwitch(props) {
  function handleChange(e) {
    props.setToggleSwitchValue(e.target.checked)
  }

  return (
    <div id="toggle-switch-div" className="group">
      <span id="toggle-switch-title">{props.toggleSwitchTexts.title}</span>
      <br />

      <span id="toggle-switch-a">{props.toggleSwitchTexts.left}</span>
      <div id="toggle-switch-slider">
        <label class="toggle-switch">
          <input type="checkbox" onChange={e => handleChange(e)} />
          <span class="slider round"></span>
        </label>
      </div>
      <span id="toggle-switch-b">{props.toggleSwitchTexts.right}</span>
    </div>
  )
}

export default ToggleSwitch
