import React, { useEffect } from "react"

function DownloadAllUserXlsx(props) {

  return (
    <div id="download-user-div">
        <a href="/api/excel-get-all-user">
            <button className="button round-corner">Excel letöltése</button>
        </a>
    </div>
  )
}

export default DownloadAllUserXlsx
