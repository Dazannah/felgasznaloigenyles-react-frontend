import React, { useEffect } from "react"
import Axios from "axios"

function DownloadAllUserXlsx(props) {
    async function getXls(){
        await Axios.get("/excel-get-all-user",{
        headers: {
            'Content-Type': 'application/pdf',
          }})
    }

  return (
    <div>
        <a href="/api/excel-get-all-user">
            <button className="form-submit-input round-corner" /*onClick={getXls}*/>Összes felhasználó excel</button>
        </a>
    </div>
  )
}

export default DownloadAllUserXlsx
