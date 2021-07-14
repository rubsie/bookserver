import React, {useCallback} from "react";
import {useMessageContext} from "../contexts/messagecontext";
import {FiAlertTriangle} from 'react-icons/fi';
import {MdSync} from 'react-icons/md';
import {MDBTypography} from "mdb-react-ui-kit";

export function Message() {
    const {message, clearAllMessages, error, isLoading} = useMessageContext();

    console.log("render Message");

    const getNoteColor = useCallback(() => {
        if (error) return `danger`;
        if (isLoading || message) return 'primary';
        return "";
    }, [error, isLoading, message]);

    const getMessageToShow = useCallback(() => {
        if (error) return <span><FiAlertTriangle className="icons-message-class-name"/> {error}</span>;
        if (isLoading) return <span><MdSync className="icons-message-class-name"/></span>;
        return message || <span>&nbsp;</span>;
    }, [error, isLoading, message]);

    return <MDBTypography note noteColor={getNoteColor()}  className="border-0" onClick={() => clearAllMessages()}>
        {getMessageToShow()}
    </MDBTypography>

}