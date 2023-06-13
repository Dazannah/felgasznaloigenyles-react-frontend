import React, {useContext} from "react"
import FormDispatchContext from "../FormDispatchContext.jsx"

function CreateNewTextarea(props){
    const formDispatch = useContext(FormDispatchContext)

    return(
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            Egyéb igény (egyéb szakrendszer, alkalmazás, mobiltelefon, adathordozó, laptop használat):
            <br />
            <textarea {...props.listOut ? {value:`${props.request.createTextArea}`, readOnly:true   } : "" } onChange={e => formDispatch({type: "setCreateTextArea", value: e.target.value})} className="roundCorner textArea" id="createTextArea" name="createTextArea"></textarea>
            <br />
            <br />
        </>
    )
}

export default CreateNewTextarea