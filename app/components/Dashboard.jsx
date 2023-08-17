import React, { useEffect, useState, useContext, useRef } from "react"
import Page from "./Page.jsx"
import Loading from "./Loading.jsx"
import Axios from "axios"


import DispatchContext from "../DispatchContext.jsx"
import StateContext from "../StateContext.jsx"


function CreateNew() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [isLoading, setIsloading] = useState(true)



if(isLoading){
    return <Page title="Dashboard">
        <Loading/>
    </Page>
}
  return (
    <Page title="Dashboard">
        asd
    </Page>
  )
}

export default CreateNew
