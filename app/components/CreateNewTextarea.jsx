import React from "react"

function CreateNewTextarea(){

    return(
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            Egyéb igény (egyéb szakrendszer, alkalmazás, mobiltelefon, adathordozó, laptop használat):
            <br />
            <textarea onChange={e => setCreateTextArea(e.target.value)} className="roundCorner textArea" id="createTextArea" name="createTextArea"></textarea>
            <br />
            <br />
        </>
    )
}

export default CreateNewTextarea