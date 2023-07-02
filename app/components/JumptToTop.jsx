import React, { useEffect } from "react"

function JumptToTop(props) {
  function jumpToTop() {
    scroll(0, 0)
  }

  return (
    <div id="jump-to-top-arrow-div" onClick={jumpToTop}>
      <span className="jump-to-top-arrow-span">&#8679;</span>
    </div>
  )
}

export default JumptToTop
