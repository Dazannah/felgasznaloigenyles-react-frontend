import React, { useEffect } from "react"

function Pages(props) {
  function decrease() {
    if (props.from - props.displayNumber > -1) props.setFrom(props.from - props.displayNumber)
  }

  function increase() {
    if (props.from + props.displayNumber < props.arrayLength) props.setFrom(props.from + props.displayNumber)
  }
  function handleClick(targetName) {
    if (targetName === "decrease") decrease()
    if (targetName === "increase") increase()
  }

  return (
    <div id="pages">
      {" "}
      <button name="decrease" onClick={e => handleClick(e.target.name)}>
        &#8249;
      </button>
      {props.from + 1} - {props.from + props.displayNumber}
      <button name="increase" onClick={e => handleClick(e.target.name)}>
        &#8250;
      </button>
      <select name="" id="">
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="25">20</option>
        <option value="25">25</option>
      </select>
    </div>
  )
}

export default Pages
