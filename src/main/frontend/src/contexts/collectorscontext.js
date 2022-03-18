import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useFetchContext} from "./fetchcontext";

const CollectorsContext = createContext();

export function CollectorsProvider(props) {
    const [collectors, setCollectors] = useState([]);
    const [isCollectorsDirty, setIsCollectorsDirty] = useState(true);
    const {fetchGET} = useFetchContext();

    console.log({isCollectorsDirty, collectors});

    const getCollectors= useCallback(async () => {
        setIsCollectorsDirty(true);
    }, [setIsCollectorsDirty]);

    useEffect(() => {
        console.log(`useEffect CollectorsContext`, {isCollectorsDirty});
        const fetchCollectorsIfDirty = async () => {
            if (!isCollectorsDirty) return;
            const fetchedCollectors = await fetchGET("api/verzamelaars");
            if (fetchedCollectors) {
                setCollectors(fetchedCollectors);
                setIsCollectorsDirty(false);
            }
        };
        fetchCollectorsIfDirty();
    }, [isCollectorsDirty, fetchGET, setCollectors, setIsCollectorsDirty]);

    const api = useMemo(() => ({
            collectors,
            getCollectors
        }),
        [collectors, getCollectors]);

    return <CollectorsContext.Provider value={api}>
        {props.children}
    </CollectorsContext.Provider>
}

export const usePCollectorsContext = () => useContext(CollectorsContext);