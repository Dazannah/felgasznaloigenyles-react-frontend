function utils(serverResponseData, appDispatch, functionToRun) {
  if (functionToRun == "checkToken") {
    const result = checkToken(serverResponseData, appDispatch)
    return result
  }
}

function checkToken(serverResponseData, appDispatch) {
  if (serverResponseData.tokenExpired) {
    appDispatch({ type: "logout" })
    return true
  } else {
    return false
  }
}

//cjs-re áét

export default utils
