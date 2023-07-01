import React, { useEffect, useContext } from "react"
import Container from "./Container.jsx"

import DispatchContext from "../DispatchContext.jsx"

function Page(props) {
  const appDispatch = useContext(DispatchContext)

  useEffect(() => {
    document.title = `${props.title}`
    appDispatch({ type: "setSiteLocation", value: `${props.title}` })
    window.scrollTo(0, 0)
  }, [])

  return <Container>{props.children}</Container>
}

export default Page
