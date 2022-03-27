import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useFetchContext} from "./fetchcontext";
import {useMessageContext} from "./messagecontext";

const GenresContext = createContext();

export function GenresProvider(props) {
    const [genres, setGenres] = useState([]);
    const {fetchGET, fetchPOST, fetchPUT, fetchDELETE} = useFetchContext();
    const [isGenresDirty, setIsGenresDirty] = useState(true);
    const {setMessage} = useMessageContext();
    console.log({genres});

    const getGenres= useCallback(async () => {
        setIsGenresDirty(true);
    }, [setIsGenresDirty]);

    const createGenre = useCallback(async (genre) => {
        let result = await fetchPOST('/api/genres', genre)
        if (!result) return;
        else {
            setIsGenresDirty(true);
            setMessage(`New genre ${result.name} with id ${result.id} created`)
        }
        return result
    }, [fetchPOST, setMessage, setIsGenresDirty])

    const editGenre = useCallback(async (bodyObject) => {
        let result = await fetchPUT('/api/genres', bodyObject)
        if (!result) return;
        else {
            setIsGenresDirty(true);
            setMessage(`Genre ${result.id} edited to ${result.name}`)
        }
    }, [fetchPUT, setMessage, setIsGenresDirty])

    const deleteGenre = useCallback(async (id) => {
        let result = await fetchDELETE(`/api/genres/${id}`)
        if (!result) {
            setMessage('Could not delete genre')
            return;
        } else {
            setIsGenresDirty(true);
            setMessage(`Genre ${id} deleted`)
        }
    }, [fetchPUT, setMessage, setIsGenresDirty])

    //when app opens (on first render) we get the authors from the server
    useEffect(() => {
        console.log(`useEffect Genrescontext`, {isGenresDirty});
        const fetchGenresIfDirty = async () => {
            if (!isGenresDirty) return;
            const fetchedGenres = await fetchGET("api/genres");
            if (fetchedGenres) {
                setGenres(fetchedGenres);
                setIsGenresDirty(false);
            }
        };
        fetchGenresIfDirty();
    }, [isGenresDirty, fetchGET, setGenres, setIsGenresDirty]);

    const api = useMemo(() => ({
        genres, getGenres, isGenresDirty, setIsGenresDirty, createGenre, editGenre, deleteGenre
    }), [genres, getGenres, isGenresDirty, setIsGenresDirty, createGenre, editGenre, deleteGenre]);

    return <GenresContext.Provider value={api}>
        {props.children}
    </GenresContext.Provider>
}

export const useGenresContext = () => useContext(GenresContext);