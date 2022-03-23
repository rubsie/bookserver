import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useFetchContext} from "./fetchcontext";
import {useMessageContext} from "./messagecontext";

const AuthorsContext = createContext();

export function AuthorsProvider(props) {
    const [authors, setAuthors] = useState([]);
    const {fetchGET, fetchPOST, fetchPUT, fetchDELETE} = useFetchContext();
    const [isAuthorsDirty, setIsAuthorsDirty] = useState(true);
    const {setMessage} = useMessageContext();
    console.log({authors});

    const createAuthor = useCallback(async (author) => {
        let result = await fetchPOST('/api/authors', author)
        if (!result) return;
        else {
            setIsAuthorsDirty(true);
            setMessage(`New author ${result.name} with id ${result.id} created`)
        }
        return result
    }, [fetchPOST, setMessage, setIsAuthorsDirty])

    const editAuthor = useCallback(async (bodyObject) => {
        let result = await fetchPUT('/api/authors', bodyObject)
        if (!result) return;
        else {
            setIsAuthorsDirty(true);
            setMessage(`Author ${result.id} edited to ${result.name}`)
        }
    }, [fetchPUT, setMessage, setIsAuthorsDirty])

    const deleteAuthor = useCallback(async (id) => {
        let result = await fetchDELETE(`/api/authors/${id}`)
        if (!result) {
            setMessage('Could not delete author')
            return;
        } else {
            setIsAuthorsDirty(true);
            setMessage(`Author ${id} deleted`)
        }
    }, [fetchPUT, setMessage, setIsAuthorsDirty])

    //when app opens (on first render) we get the authors from the server
    useEffect(() => {
        console.log(`useEffect Authorscontext`, {isAuthorsDirty});
        const fetchAuthorsIfDirty = async () => {
            if (!isAuthorsDirty) return;
            const fetchedAuthors = await fetchGET("api/authors");
            if (fetchedAuthors) {
                setAuthors(fetchedAuthors);
                setIsAuthorsDirty(false);
            }
        };
        fetchAuthorsIfDirty();
    }, [isAuthorsDirty, fetchGET, setAuthors, setIsAuthorsDirty]);

    const api = useMemo(() => ({
        authors, isAuthorsDirty, setIsAuthorsDirty, createAuthor, editAuthor, deleteAuthor
    }), [authors, isAuthorsDirty, setIsAuthorsDirty, createAuthor, editAuthor, deleteAuthor]);

    return <AuthorsContext.Provider value={api}>
        {props.children}
    </AuthorsContext.Provider>
}

export const useAuthorsContext = () => useContext(AuthorsContext);