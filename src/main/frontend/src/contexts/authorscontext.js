import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useFetchContext} from "./fetchcontext";
import {useMessageContext} from "./messagecontext";

const AuthorsContext = createContext();

export function AuthorsProvider(props) {
    const [authors, setAuthors] = useState([]);
    const {fetchGET, fetchPOST} = useFetchContext();
    const [isAuthorsDirty, setIsAuthorsDirty] = useState(false);
    const {setMessage} = useMessageContext();
    console.log({authors});

    const getAuthors = useCallback(async () => {
        const result = await fetchGET("api/authors");
        if (result) {
            setAuthors(result);
            setIsAuthorsDirty(false);
        }
    }, [fetchGET, setAuthors]);

    const createAuthor = useCallback(async (bodyObject) => {
        let result = await fetchPOST('/api/authors/', bodyObject)
        if (!result) return;
        else setMessage('New author created: ' + JSON.stringify(result))
        return result
    }, [fetchPOST])

    //when app opens (on first render) we get the authors from the server
    useEffect(() => {
        console.log("useEffect AuthorsContext");
        getAuthors();
    }, [getAuthors, isAuthorsDirty]);

    const api = useMemo(() => ({
        authors, isAuthorsDirty, setIsAuthorsDirty, createAuthor
    }), [authors, isAuthorsDirty, setIsAuthorsDirty, createAuthor]);

    return <AuthorsContext.Provider value={api}>
        {props.children}
    </AuthorsContext.Provider>
}

export const useAuthorsContext = () => useContext(AuthorsContext);