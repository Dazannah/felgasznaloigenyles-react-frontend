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
                    <input onChange={e => setName(e.target.value)} className="content roundCorner" type="text" id="name" name="name" />
                    <br />
                    <p />
                    <DropdownMenu />

                    <input className="content roundCorner" type="text" id="class" name="class" value={formState.className} required readOnly />
                    <br />
                    <br />
                    <input hidden className="content roundCorner" type="text" id="classDbId" name="dbId" value={formState.classId} readOnly />
                </div>

                <div id="rightUp">
                    <label className="content roundCorner" htmlFor="id">
                    Nyilv. szám:
                    </label>
                    <br />
                    <input onChange={e => setTicketId(e.target.value)} className="content roundCorner" type="text" id="id" name="id" />
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
                <input onChange={e => setClassLeader(e.target.value)} className="content roundCorner" type="text" id="classLeader" name="classLeader" />
                <br />
                <label className="content roundCorner" htmlFor="workPost">
                    Beosztás:
                </label>
                <br />
                <input onChange={e => setWorkPost(e.target.value)} className="content roundCorner" type="text" id="workPost" name="workPost" />
                <br />
                <label className="content roundCorner" htmlFor="workLocation">
                    Munkavégzés helye:
                </label>
                <br />
                <input onChange={e => setWorkLocation(e.target.value)} className="content roundCorner" type="text" id="workLocation" name="workLocation" />
                <br />
                </div>
                <div id="validTo">
                <div id="validToLeft">
                    <label className="content roundCorner" htmlFor="validFrom">
                    Érvényesség kezdete:
                    </label>
                    <br />
                    <input onChange={e => setValidFrom(e.target.value)} className="content roundCorner" type="datetime-local" id="validFrom" name="validFrom" />
                    <br />
                </div>
                <div id="validToRight">
                    <label className="content roundCorner" htmlFor="validTo">
                    Érvényesség vége:
                    </label>
                    <br />
                    <input onChange={e => setValidTo(e.target.value)} className="content roundCorner" type="datetime-local" id="validTo" name="validTo" />
                    <br />
                </div>
            </div>
        </>
    )

}

export default UpperFields