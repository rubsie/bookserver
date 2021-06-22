import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';

const MessageContext = createContext();


export function MessageProvider(props) {
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    //clear message and error
    const clearAllMessages = useCallback(() => {
        console.log("clearAllMessages");
        setMessage();
        setError();
    }, [setMessage, setError]);

    const api = useMemo(() => ({
            message, setMessage, error, setError, isLoading, setIsLoading, clearAllMessages
        }), [message, setMessage, error, setError, isLoading, setIsLoading, clearAllMessages]
    );

    return (
        <MessageContext.Provider value={api}>
            {props.children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => useContext(MessageContext);
