import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useFetchContext} from "./fetchcontext";
import {useMessageContext} from "./messagecontext";

const PapersContext = createContext();

export function PapersProvider(props) {
    const [papers, setPapers] = useState([]);
    const [isPapersDirty, setIsPapersDirty] = useState(true);
    const {fetchGET, fetchPOST, fetchDELETE} = useFetchContext();
    const {setMessage} = useMessageContext();

    console.log({isPapersDirty, papers});

    const getPapers= useCallback(async () => {
        setIsPapersDirty(true);
    }, [setIsPapersDirty]);

    const createPaper = useCallback(async (paper) => {
        const savedPaper = await fetchPOST(`/api/kranten`, paper);
        if (savedPaper) setIsPapersDirty(true);
        alert('Krant '.concat(savedPaper.naam).concat(' gecreêerd.'));
        console.log('XXXXXXXXX KRANT CREATED XXXXXXXXXXXXXXXXXX');
        setMessage(`Krant werd aan collectie toegevoegd.`);
        return savedPaper;
    }, [fetchPOST, setIsPapersDirty, setMessage]);

    const deletePaper = useCallback(async (id) => {
        const result = await fetchDELETE(`/api/kranten/${id}`);
        console.log(result);
        if (result) {
            setIsPapersDirty(true);
            alert('Krant met id '.concat(id).concat(' verwijderd'));
            setMessage(`Krant uit collectie verwijderd`);
        }
    }, [fetchDELETE, setIsPapersDirty, setMessage]);

    useEffect(() => {
        console.log(`useEffect PapersContext`, {isPapersDirty});
        const fetchPapersIfDirty = async () => {
            if (!isPapersDirty) return;
            const fetchedPapers = await fetchGET("api/kranten");
            if (fetchedPapers) {
                setPapers(fetchedPapers);
                setIsPapersDirty(false);
            }
        };
        fetchPapersIfDirty();
    }, [isPapersDirty, fetchGET, setPapers, setIsPapersDirty]);

    const api = useMemo(() => ({
            papers,
            getPapers,
            createPaper,
            deletePaper
        }),
        [papers, getPapers, createPaper, deletePaper]);

    return <PapersContext.Provider value={api}>
        {props.children}
    </PapersContext.Provider>
}

export const usePapersContext = () => useContext(PapersContext);