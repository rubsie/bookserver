import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {useMessageContext} from "./messagecontext";

const FetchContext = createContext();

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
};

//utility context: this provider does not contain state.
//it provides the different types of fetch functions
//it is a provider so that it can use the functions from the MessageContext
export function FetchProvider(props) {
    const {setMessage, setIsLoading} = useMessageContext();

    const getHeaders = useCallback((addCsrf) => {
        if (!addCsrf) return DEFAULT_HEADERS;
        const cookie = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'));
        const csrfToken = cookie && cookie[1];
        console.log(`fetchWithCredentials token=${csrfToken}`);
        if (!csrfToken) return DEFAULT_HEADERS;
        return {...DEFAULT_HEADERS, 'X-XSRF-TOKEN': csrfToken};
    }, []);

    const fetchCommon = useCallback(async (method, url, bodyObject) => {
        let result = false;
        console.log(`${method} ${url}: start`);
        setIsLoading(true);
        try {
            const fetchOptions = {
                method: method,
                'credentials': 'include',
                headers: getHeaders(true),
                body: JSON.stringify(bodyObject)
            };
            const response = await fetch(url, fetchOptions);
            const responseBody = await response.json();
            if (response.ok) {
                console.log(`${method} ${url}: received response ${JSON.stringify(responseBody)}`);
                result = responseBody;
            } else {
                console.error(`ERROR ${method} ${url}: ${response.status} - ${responseBody.error} - ${responseBody.message} `);
                const errorMessage = responseBody.errors &&
                    responseBody.errors.reduce((accumulator, error) => `${accumulator} ${error.defaultMessage}  --- `, "--- ");
                console.log(`   ${JSON.stringify(responseBody)}`);
                console.log(`   ${errorMessage}`);
                setMessage(errorMessage || responseBody.message);
            }
        } catch (e) {
            console.error(`ERROR ${method} ${url}: ${e}`);
            setMessage("Connection error");
        }
        setIsLoading(false);
        console.log(`${method} ${url}: done`);
        return result;
    }, [setIsLoading, setMessage]);

    const fetchGET = useCallback(async (url) => {
            let responseBody = null;
            console.log(`get ${url}: start`);
            setIsLoading(true);
            try {
                const fetchOptions = {
                    method: 'GET',
                    'credentials': 'include',
                    headers: DEFAULT_HEADERS,
                };
                const response = await fetch(url, fetchOptions);
                responseBody = await response.json();
                console.log(`get ${url}: received response ${JSON.stringify(responseBody)}`);
            } catch (e) {
                console.error(`ERROR get ${url}: ${e}`);
                setMessage("Connection error");
            }
            setIsLoading(false);
            console.log(`get ${url}: done`);
            return responseBody;
        }, [setIsLoading, setMessage]
    );
    const fetchPUT = useCallback(async (url, bodyObject) => {
        return await fetchCommon("PUT", url, bodyObject);
    }, [fetchCommon]);

    const fetchPOST = useCallback(async (url, bodyObject) => {
        return await fetchCommon("POST", url, bodyObject);
    }, [fetchCommon]);

    const fetchDELETE = useCallback(async (url) => {
        return await fetchCommon("DELETE", url);
    }, [fetchCommon]);

    const api = useMemo(() => ({fetchGET, fetchPUT, fetchPOST, fetchDELETE}),
        [fetchGET, fetchPUT, fetchPOST, fetchDELETE]);

    return (
        <FetchContext.Provider value={api}>
            {props.children}
        </FetchContext.Provider>
    )
}

export const useFetchContext = () => useContext(FetchContext);
