import React, { useEffect } from "react"
import Container from "./Container.jsx"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title}`
    window.scrollTo(0, 0)
  }, [])

  return <Container>{props.children}</Container>
}

export default Page
