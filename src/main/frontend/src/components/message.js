import React from "react";
import Alert from 'react-bootstrap/Alert';
import {useMessageContext} from "../contexts/messagecontext";

export function Message() {
    const {message, setMessage, isLoading} = useMessageContext();
    const close = () => setMessage();

    const messageToShow = isLoading ? "Loading Data!" : (message || <span>&nbsp;</span>);
    return <Alert variant="primary" className="text-center" onClick={close}>
        {messageToShow}
    </Alert>

}