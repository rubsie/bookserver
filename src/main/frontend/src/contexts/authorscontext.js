import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useFetchContext} from "./fetchcontext";

const AuthorsContext = createContext();

export function AuthorsProvider(props) {
    const [authors, setAuthors] = useState([]);
    const {fetchGET} = useFetchContext();
    const [isAuthorsDirty, setIsAuthorsDirty] = useState(false);
    console.log({authors});

    const getAuthors = useCallback(async () => {
        const result = await fetchGET("api/authors");
        if (result) {
            setAuthors(result);
            setIsAuthorsDirty(false);
        }
    }, [fetchGET, setAuthors]);

    //when app opens (on first render) we get the authors from the server
    useEffect(() => {
        console.log("useEffect AuthorsContext");
        getAuthors();
    }, [getAuthors, isAuthorsDirty]);

    const api = useMemo(() => ({
        authors, isAuthorsDirty, setIsAuthorsDirty
    }), [authors, isAuthorsDirty, setIsAuthorsDirty]);

    return <AuthorsContext.Provider value={api}>
        {props.children}
    </AuthorsContext.Provider>
}

export const useAuthorsContext = () => useContext(AuthorsContext);