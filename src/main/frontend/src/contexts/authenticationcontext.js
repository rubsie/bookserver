import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useMessageContext} from "./messagecontext";
import {useFetchContext} from "./fetchcontext";

const AuthenticationContext = createContext();

export function AuthenticationProvider(props) {
    const [username, setUsername] = useState();
    const [showLoginBox, setShowLoginBox] = useState(false);
    const {clearAllMessages, setError} = useMessageContext();
    const {fetchGET, fetchGETWithExtraHeaders, fetchPOST} = useFetchContext();

    const authenticate = useCallback(async (username, password) => {
        const extraHeaders = {authorization: "Basic " + window.btoa(`${username}:${password}`)};
        const response = await fetchGETWithExtraHeaders(`/api/authenticate`, extraHeaders);
        if (response) {
            setUsername(response.username);
            clearAllMessages();
            setShowLoginBox(false);
        } else {
            setError("username/password not correct");
        }
    }, [fetchGETWithExtraHeaders, setUsername, clearAllMessages, setShowLoginBox, setError]);

    const refreshAuthentication = useCallback(async () => {
        const response = await fetchGET(`/api/authenticate`);
        if (response) {
            setUsername(response.username);
        }
        clearAllMessages();
    }, [fetchGET, setUsername, clearAllMessages]);

    const logout = useCallback(async () => {
        const response = await fetchPOST(`/logout`);
        if (response) {
            setUsername();
            clearAllMessages();
        }
    }, [fetchPOST, setUsername, clearAllMessages]);

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
