import React, {createContext, useContext, useMemo, useState} from 'react';

const MessageContext = createContext();


export function MessageProvider(props) {
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const api = useMemo(() => ({
            message, setMessage, isLoading, setIsLoading
        }), [message, setMessage, isLoading, setIsLoading]
    );

    return (
        <MessageContext.Provider value={api}>
            {props.children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => useContext(MessageContext);
