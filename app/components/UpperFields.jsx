import React, {useContext} from "react"

import DropdownMenu from "./DropdownMenu.jsx"

import FormDispatchContext from "../FormDispatchContext.jsx"
import FormStateContext from "../FormStateContext.jsx"

function UpperFields(props){
    const formState = useContext(FormStateContext)
    const formDispatch = useContext(FormDispatchContext)



    return(
        <>
            <div id="row">
                <div id="leftUp">
                    <label className="content roundCorner" htmlFor="name">
                    Név:
                    </label>
                    <br />
                    <input onChange={e => formDispatch({type: "setName",value: e.target.value})} className="content roundCorner" type="text" id="name" name="name" {...props.listOut ? {value:`${props.request.personalInformations.name}`, readOnly:true   } : "" }/>
                    <br />
                    <p />
                    { props.listOut ? "Osztály:" : <DropdownMenu />}


                    <input className="content roundCorner" type="text" id="class" name="class" value={formState.className} readOnly {...props.listOut ? {value:`${props.request.personalInformations.className}`, readOnly:true}: "" }/>
                    <br />
                    <br />
                    <input hidden className="content roundCorner" type="text" id="classDbId" name="dbId" {...props.listOut ? {value:`${props.request.personalInformations._id}`} : {value: formState.classId}} readOnly />
                </div>

                <div id="rightUp">
                    <label className="content roundCorner" htmlFor="id">
                    Nyilv. szám:
                    </label>
                    <br />
                    <input onChange={e => formDispatch({type: "setTicketId", value: e.target.value})} className="content roundCorner" type="text" id="id" name="id" {...props.listOut ? {value:`${props.request.personalInformations.ticketId}`, readOnly:true}: "" }/>
                    <p />

                    <input type="radio" id="newUser" name="process" value="Új felhasználó" checked readOnly />
                    <label htmlFor="newUser">Új felhasználó</label>
                    <br />
                </div>
                </div>
                <div id="middle">
                <label className="content roundCorner" htmlFor="classLeader">
                    Osztályvezető:
                </label>
                <br />
                <input onChange={e => formDispatch({type: "setClassLeader", value: e.target.value})} className="content roundCorner" type="text" id="classLeader" name="classLeader" {...props.listOut ? {value:`${props.request.personalInformations.classLeader}`, readOnly:true}: "" }/>
                <br />
                <label className="content roundCorner" htmlFor="workPost">
                    Beosztás:
                </label>
                <br />
                <input onChange={e => formDispatch({type: "setWorkPost", value: e.target.value})} className="content roundCorner" type="text" id="workPost" name="workPost" {...props.listOut ? {value:`${props.request.personalInformations.workPost}`, readOnly:true}: "" }/>
                <br />
                <label className="content roundCorner" htmlFor="workLocation">
                    Munkavégzés helye:
                </label>
                <br />
                <input onChange={e => formDispatch({type: "setWorkLocation", value: e.target.value})} className="content roundCorner" type="text" id="workLocation" name="workLocation" {...props.listOut ? {value:`${props.request.personalInformations.workLocation}`, readOnly:true}: "" }/>
                <br />
                </div>
                <div id="validTo">
                <div id="validToLeft">
                    <label className="content roundCorner" htmlFor="validFrom">
                    Érvényesség kezdete:
                    </label>
                    <br />
                    <input onChange={e => formDispatch({type: "setValidFrom", value: e.target.value})} className="content roundCorner" type="datetime-local" id="validFrom" name="validFrom" {...props.listOut ? {value:`${props.request.personalInformations.validFrom}`, readOnly:true}: "" }/>
                    <br />
                </div>
                <div id="validToRight">
                    <label className="content roundCorner" htmlFor="validTo" {...props.listOut ? {value:`${props.request.personalInformations.validTo}`, readOnly:true}: "" }>
                    Érvényesség vége:
                    </label>
                    <br />
                    <input onChange={e => formDispatch({type: "setValidTo", value: e.target.value})} className="content roundCorner" type="datetime-local" id="validTo" name="validTo"{...props.listOut ? {value:`${props.request.personalInformations.validTo}`, readOnly:true}: "" }/>
                    <br />
                </div>
            </div>
        </>
    )

}

export default UpperFields