import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useMessageContext} from "./messagecontext";
import {useFetchContext} from "./fetchcontext";

const AuthenticationContext = createContext();

export function AuthenticationProvider(props) {
    const [username, setUsername] = useState();
    const [showLoginBox, setShowLoginBox] = useState(false);
    const [showSignupBox, setShowSignupBox] = useState(false);
    const {clearAllMessages, setMessage, setError} = useMessageContext();
    const {fetchGET, fetchGETWithExtraHeaders, fetchPOST} = useFetchContext();

    const authenticate = useCallback(async (username, password) => {
        const extraHeaders = {authorization: "Basic " + window.btoa(`${username}:${password}`)};
        const response = await fetchGETWithExtraHeaders(`/api/authenticate`, extraHeaders);
        if (response) {
            setUsername(response.username);
            clearAllMessages();
        } else {
            setError("username/password not correct");
        }
        return response;
    }, [fetchGETWithExtraHeaders, setUsername, clearAllMessages, setShowLoginBox, setError]);

    const signup = useCallback(async (username, email, password) => {
        console.log(`signup: ${username}, ${email}, ${password}`);
        const response = await fetchPOST(`/api/signup`,{username, email, password});
        if (response) {
            setUsername(response.username);
            setMessage(`welcome ${response.username}!`);
            setShowSignupBox(false);
        }
        return response;
    }, []);

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
    const openLoginForm = useCallback(() => {
        setShowLoginBox(true);
        setShowSignupBox(false);
    }, [setShowLoginBox]);

    const openSignupForm = useCallback(() => {
        setShowLoginBox(false);
        setShowSignupBox(true);
    }, [setShowSignupBox]);

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
            showSignupBox,
            setShowSignupBox,
            authenticate,
            refreshAuthentication,
            signup,
            logout,
            openLoginForm,
            openSignupForm,
            isLoggedIn
        }), [username, setUsername, showLoginBox, setShowLoginBox, showSignupBox, setShowSignupBox,
            authenticate, refreshAuthentication, signup, logout, openLoginForm, openSignupForm, isLoggedIn]
    );

    return (
        <AuthenticationContext.Provider value={api}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);
