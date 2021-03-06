import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {useMessageContext} from "./messagecontext";

const FetchContext = createContext();

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
};
const HTTP_STATUS_NO_CONTENT = 204;

//utility context: this provider does not contain state.
//it provides the different types of fetch functions
//it is a provider so that it can use the functions from the MessageContext
export function FetchProvider(props) {
    const {setError, setIsLoading, clearAllMessages} = useMessageContext();

    //addCsrf header is only necessary for POST/PUT/DELETE, not for GET
    //we get the csrf-token from the cookie and add it in the X-XSRF-TOKEN header
    const getHeaders = useCallback((addCsrf, addExtraHeaders) => {
        const headersWithExtra = {...DEFAULT_HEADERS, ...addExtraHeaders};
        if (!addCsrf) return headersWithExtra;

        const cookie = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'));
        const csrfToken = cookie && cookie[1];
        console.log({csrfToken});
        if (!csrfToken) return headersWithExtra;

        return {...headersWithExtra, 'X-XSRF-TOKEN': csrfToken};
    }, []);

    const fetchCommon = useCallback(async (method, url, bodyObject, addCsrf, addExtraHeaders) => {
        let result = undefined;
        clearAllMessages();
        console.log(`${method} ${url}: start`);
        setIsLoading(true);
        const fetchOptions = {
            method: method,
            headers: getHeaders(addCsrf, addExtraHeaders),
            body: JSON.stringify(bodyObject)
        };
        try {
            const response = await fetch(url, fetchOptions);
            console.log({response});
            if (response.ok) {
                const responseBody = (response.status !== HTTP_STATUS_NO_CONTENT) ? await response.json() : {};
                console.log(`${method} ${url}: received response ${JSON.stringify(responseBody)}`);
                result = responseBody;
            } else {
                const responseBody = await response.json();
                console.error(`ERROR ${method} ${url}: ${response.status} - ${responseBody.error} - ${responseBody.message} `);
                const errorMessage = responseBody.errors &&
                    responseBody.errors.reduce((accumulator, error) => `${accumulator} ${error.defaultMessage}  --- `, "--- ");
                console.log(`   ${JSON.stringify(responseBody)}`);
                console.log(`   ${errorMessage}`);
                setError(errorMessage || responseBody.message);
            }
        } catch (e) {
            console.error(`ERROR ${method} ${url}: ${e}`);
            setError("Connection error");
        }
        setIsLoading(false);
        console.log(`${method} ${url}: done`);
        return result;
    }, [clearAllMessages, setIsLoading, setError, getHeaders]);

    const fetchGET = useCallback(async (url) => {
        return await fetchCommon("GET", url, undefined);
    }, [fetchCommon]);

    const fetchGETWithExtraHeaders = useCallback(async (url, addExtraHeaders) => {
        return await fetchCommon("GET", url, undefined, false, addExtraHeaders);
    }, [fetchCommon]);

    const fetchPUT = useCallback(async (url, bodyObject) => {
        return await fetchCommon("PUT", url, bodyObject, true);
    }, [fetchCommon]);

    const fetchPOST = useCallback(async (url, bodyObject) => {
        return await fetchCommon("POST", url, bodyObject, true);
    }, [fetchCommon]);

    const fetchDELETE = useCallback(async (url) => {
        return await fetchCommon("DELETE", url, undefined, true);
    }, [fetchCommon]);

    const api = useMemo(() => ({
            fetchGET,
            fetchGETWithExtraHeaders,
            fetchPUT,
            fetchPOST,
            fetchDELETE
        }),
        [fetchGET, fetchGETWithExtraHeaders, fetchPUT, fetchPOST, fetchDELETE]);

    return (
        <FetchContext.Provider value={api}>
            {props.children}
        </FetchContext.Provider>
    )
}

export const useFetchContext = () => useContext(FetchContext);
