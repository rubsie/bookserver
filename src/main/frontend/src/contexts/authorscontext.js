import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useFetchContext} from "./fetchcontext";

const AuthorsContext = createContext();

export function AuthorsProvider(props) {
    const [authors, setAuthors] = useState([]);
    const {fetchGET} = useFetchContext();

    console.log({authors});

    const getAuthors = useCallback(async () => {
        const result = await fetchGET("api/authors");
        if (result) {
            setAuthors(result);
        }
    }, [fetchGET, setAuthors]);

    //when app opens (on first render) we get the authors from the server
    useEffect(() => {
        console.log("useEffect AuthorsContext");
        getAuthors();
    }, [getAuthors]);

    const api = useMemo(() => ({authors, getAuthors}),
        [authors, getAuthors]);

    return <AuthorsContext.Provider value={api}>
        {props.children}
    </AuthorsContext.Provider>
}

export const useAuthorsContext = () => useContext(AuthorsContext);