import React, {createContext, useContext, useMemo, useCallback} from 'react';
import {useMessageContext} from "./messagecontext";
import {fetchWithCsrf} from "../utilities/fetch";

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

    const fetchGet = useCallback(async (url) => {
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

    const fetchPut = useCallback(async (url, bodyObject) => {
            let result = false;
            console.log(`put ${url}: start`);
            setIsLoading(true);
            try {
                const fetchOptions = {
                    method: 'PUT',
                    'credentials': 'include',
                    headers: DEFAULT_HEADERS,
                    body: JSON.stringify(bodyObject)
                };
                const response = await fetchWithCsrf(url, fetchOptions);
                const responseBody = await response.json();
                if (response.ok) {
                    console.log(`put ${url}: received response ${JSON.stringify(responseBody)}`);
                    console.log(`   async editBook: received response ${JSON.stringify(responseBody)}`);
                    result = true;
                } else {
                    console.error(`ERROR put ${url}: ${response.status} - ${responseBody.error} - ${responseBody.message} `);
                    setMessage(responseBody.message);
                }
            } catch (e) {
                console.error(`ERROR put ${url}: ${e}`);
                setMessage("Connection error");
            }
            setIsLoading(false);
            console.log(`put ${url}: done`);
            return result;
        }, [setIsLoading, setMessage]
    );

    const api = useMemo(() => ({fetchGet, fetchPut}),
        [fetchGet, fetchPut]);

    return (
        <FetchContext.Provider value={api}>
            {props.children}
        </FetchContext.Provider>
    )
}

export const useFetchContext = () => useContext(FetchContext);
