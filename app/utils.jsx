import { useState } from "react"

function checkToken(serverResponseData, appDispatch) {
  if (serverResponseData.tokenExpired) {
    appDispatch({ type: "logout" })
    return true
  } else {
    return false
  }
}

function validateRequest(formState) {
  let errors = []

  if (!formState.name) errors.push("Név megadása kötelező.")
  if (!formState.classId) errors.push("Osztály megadása kötelező.")
  if (!formState.classLeader) errors.push("Osztályvezető megadása kötelező.")
  if (!formState.workPost) errors.push("Beosztás megadása kötelező.")
  if (!formState.workLocation) errors.push("Munkavégzés hely megadása kötelező.")
  if (formState.isTechnical) {
    if (formState.validTo == "") {
      errors.push("Technikai fiók esetében érvényesség vége megadása kötelező.")
    }

    if (formState.technicalTextArea.trim() == "") errors.push("Technikai fiók megjegyzés megadása kötelező.")
  }

  if (errors.length != 0) return errors
}

function serializeDataToSend(formState, statesLeftCollumn, statesMiddleCollumn, statesRightCollumn) {
  const personalInformations = {
    name: formState.name,
    classId: formState.classId,
    className: formState.className,
    ticketId: formState.ticketId,
    classLeader: formState.classLeader,
    workPost: formState.workPost,
    workLocation: formState.workLocation,
    validFrom: formState.validFrom,
    validTo: formState.validTo
  }
  const userPermissionsLeft = getUserPermissions(statesLeftCollumn)
  const userPermissionsMiddle = getUserPermissions(statesMiddleCollumn)
  const userPermissionsRight = getUserPermissions(statesRightCollumn)

  const dataToSend = {
    personalInformations,
    userPermissionsLeft,
    userPermissionsMiddle,
    userPermissionsRight,
    createTextArea: formState.createTextArea,
    technical: {
      isTechnical: formState.isTechnical,
      technicalTextArea: formState.technicalTextArea
    }
  }

  return dataToSend
}

function generateState(array) {
  let statesArray = []
  let counter = 0

  array.forEach(element => {
    let temp = element.id
    let temp2 = "set" + element.id
    statesArray[counter] = [temp, temp2] = useState({ name: element.id, value: false })
    counter++
  })

  return statesArray
}

function getUserPermissions(permissionsArray) {
  let resultPermissionArray = []
  permissionsArray.forEach((element, index) => {
    resultPermissionArray[index] = element[0]
    console.log(element)
  })
  return resultPermissionArray
}

function showError(err, appDispatch) {
  if (err.request) {
    if (err.request.status === 403) {
      appDispatch({ type: "flashMessageWarning", value: "Nincs jogosultságod a menüponthoz." })
    } else if (err.response.status === 401) {
      //dont do anything
    } else {
      appDispatch({ type: "flashMessageError", value: `${err}` })
    }
  } else {
    appDispatch({ type: "flashMessageError", value: `${err}` })
  }
}

export { checkToken, validateRequest, serializeDataToSend, generateState, getUserPermissions, showError }
