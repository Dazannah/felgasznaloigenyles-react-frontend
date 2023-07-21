import React from "react"

function RequestDetails(props){
    return(
        <>
            <table className="edit-table group round-corner">
                <tr>
                    <th></th>
                    <th>Álltal</th>
                    <th>Ekkor</th>
                </tr>
                <tr>
                    <td>Kérvényezve:</td>
                    <td>{props.request.ticketCreation.userName}</td>
                    <td>{props.request.ticketCreation.createTime}</td>
                </tr>
                <tr>
                    <td>Engedélyezve:</td>
                    <td>{props.request.permission.authorizedBy}</td>
                    <td>{props.request.permission.permissionTime}</td>
                </tr>
                <tr>
                    <td>Létrehozva:</td>
                    <td>{props.request.completed.userName}</td>
                    <td>{props.request.completed.createTime}</td>
                </tr>
            </table>
        </>
    )
}

export default RequestDetails