import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useMessageContext} from "./messagecontext";
import {useFetchContext} from "./fetchcontext";

const AuthenticationContext = createContext();

export function AuthenticationProvider(props) {
    const [username, setUsername] = useState();
    const [showLoginBox, setShowLoginBox] = useState(false);
    const {setMessage, setIsLoading} = useMessageContext();
    const {fetchGET, fetchGETWithExtraHeaders, fetchPOST} = useFetchContext();

    const authenticate = useCallback(async (username, password) => {
        const extraHeaders = {authorization: "Basic " + window.btoa(`${username}:${password}`)};
        const response = await fetchGETWithExtraHeaders(`/api/authenticate`, extraHeaders);
        if (response) {
            setUsername(response.username);
            setMessage();
            setShowLoginBox(false);
        } else {
            setMessage("username/password not correct");
        }
    }, [setUsername, setMessage, setShowLoginBox]);

    const refreshAuthentication = useCallback(async () => {
        const response = await fetchGET(`/api/authenticate`);
        if (response) {
            setUsername(response.username);
        }
        setMessage();
    }, [setIsLoading, setUsername]);

    const logout = useCallback(async () => {
        const response = await fetchPOST(`/logout`);
        if (response) {
            setUsername();
            setMessage();
        }
    }, [setIsLoading, setUsername, setMessage]);

    //convert to a boolean
    const isLoggedIn = useMemo(() => !!username, [username]);

    //when we want to login we open the login-box
    const login = useCallback(() => setShowLoginBox(true), [setShowLoginBox]);

    //when the app opens (first render) we check if there is a cookie
    //if there is one, it means that this user has used this app before
    //we check if the browser/and/or/cookie contains credentials by simply trying if we can access a secure url
    //the result is that we remain logged in when browser is refreshed
    useEffect(() => {
        console.log("useEffect authenticationContext");
        if (document.cookie)
            refreshAuthentication();
    }, [refreshAuthentication]);

    const api = useMemo(() => ({
            username,
            setUsername,
            showLoginBox,
            setShowLoginBox,
            authenticate,
            refreshAuthentication,
            login,
            logout,
            isLoggedIn
        }), [username, setUsername, showLoginBox, setShowLoginBox, authenticate, refreshAuthentication, login, logout, isLoggedIn]
    );

    return (
        <AuthenticationContext.Provider value={api}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);
