import React, {createContext, useContext, useMemo, useState, useCallback} from 'react';
import {useMessageContext} from "./messagecontext";

const AuthenticationContext = createContext();


export function AuthenticationProvider(props) {
    const [username, setUsername] = useState();
    const [showLoginBox, setShowLoginBox] = useState(false);
    const {setMessage, setIsLoading} = useMessageContext();

    const authenticate = useCallback(async (username, password) => {
        console.log(`   async authenticate: start ${username}`);
        setIsLoading(true);
        try {
            const fetchOptions = {
                method: 'GET',
                'credentials': 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    authorization: "Basic " + window.btoa(`${username}:${password}`)
                },
            };
            const response = await fetch(`/api/authenticate`, fetchOptions);
            const body = await response.json();
            console.log(`   async authenticate: received response ${JSON.stringify(body)}`);
            setUsername(body.username);
            setMessage();
            setShowLoginBox(false);
            console.log("   async authenticate: done");
        } catch (e) {
            console.log(`   async authenticate: ERROR ${JSON.stringify(e)}`);
            setMessage("Login error");
        }
        setIsLoading(false);
    }, [setIsLoading, setUsername, setMessage, setShowLoginBox]);

    const refreshAuthentication = useCallback(async () => {
        console.log(`   async refreshAuthentication: start`);
        setIsLoading(true);
        try {
            const fetchOptions = {
                method: 'GET',
                'credentials': 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            };
            const response = await fetch(`/api/authenticate`, fetchOptions);
            const body = await response.json();
            console.log(`   async refreshAuthentication: received response ${JSON.stringify(body)}`);
            setUsername(body.username);
            console.log("   async refreshAuthentication: done");
        } catch (e) {
            console.log(`   async refreshAuthentication: ERROR ${e}`);
        }
        setIsLoading(false);
    }, [setIsLoading, setUsername, setMessage]);

    const api = useMemo(() => ({
            username, setUsername, showLoginBox, setShowLoginBox, authenticate, refreshAuthentication
        }), [username, setUsername, showLoginBox, setShowLoginBox, authenticate, refreshAuthentication]
    );

    return (
        <AuthenticationContext.Provider value={api}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);