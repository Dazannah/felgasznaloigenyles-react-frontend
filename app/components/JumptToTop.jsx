import React, { useEffect } from "react"

function JumptToTop(props) {
  function jumpToTop() {
    scroll(0, 0)
  }

  return (
    <div id="jump-to-top-arrow-div" onClick={jumpToTop}>
      <i className="arrow up"></i>
    </div>
  )
}

export default JumptToTop
