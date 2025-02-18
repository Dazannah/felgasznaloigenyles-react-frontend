import React, { useEffect } from "react"

function Pages(props) {
  function decrease() {
    if (props.from - props.displayNumber > -1) {
      props.setFrom(props.from - props.displayNumber)
    } else {
      props.setFrom(0)
    }
  }

  function increase() {
    if (props.from + props.displayNumber < props.arrayLength) props.setFrom(props.from + props.displayNumber)
  }

  function handleClick(targetName) {
    if (targetName === "decrease") decrease()
    if (targetName === "increase") increase()
  }

  function handleSelect(showNumber) {
    props.setDisplayNumber(parseInt(showNumber))
  }

  useEffect(()=>{
    if( props.arrayLength<(props.from + props.displayNumber) ){
      const tmp = props.arrayLength - props.displayNumber
      if(tmp < 0){
        props.setFrom(0)
      }else{
        props.setFrom(Math.round((props.arrayLength - props.displayNumber)/10)*10)
      }
    }
  },[props.arrayLength])

  return (
    <div id="pages">
      {" "}
      <button className="button round-corner" name="decrease" onClick={e => handleClick(e.target.name)}>
        &#8249;
      </button>
      <span>
        {props.from + 1} - {props.from + props.displayNumber}
      </span>
      <button className="button round-corner" name="increase" onClick={e => handleClick(e.target.name)}>
        &#8250;
      </button>
      <select className="round-corner" onChange={e => handleSelect(e.target.value)}>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
    </div>
  )
}

export default Pages
