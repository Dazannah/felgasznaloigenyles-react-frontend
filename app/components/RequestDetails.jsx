import React from "react"

function RequestDetails(props){
    return(
        <>
            <br />
            Kérelem részletei
            <table className="edit-table group round-corner">
                <tr>
                    <th></th>
                    <th>Felhasználó</th>
                    <th>Időpont</th>
                </tr>
                <tr>
                    <td>Kérvényezte:</td>
                    <td>{props.request.ticketCreation.userName}</td>
                    <td>{props.request.ticketCreation.createTime}</td>
                </tr>
                
                <tr>
                    <td>Felülbírálta:</td>
                    <td>{props.request.permission ? props.request.permission.authorizedBy : "——" }</td>
                    <td>{props.request.permission ? props.request.permission.permissionTime : "——" }</td>
                </tr>
                <tr>
                    <td>Lezárta:</td>
                    <td>{props.request.completed ? props.request.completed.userName : "——" }</td>
                    <td>{props.request.completed ? props.request.completed.createTime  : "——" }</td>
                </tr>
            </table>
            <br />
        </>
    )
}

export default RequestDetails