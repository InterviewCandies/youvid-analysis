import React, { createContext, useEffect, useState } from "react";
import { ResultsType} from "../types/types";
import { readCSV } from "../utils/readCSV";
export const resultsContext = createContext<ResultsType[]>([]);

function ResultsProvider({ children }: { children: JSX.Element }) {
    const [videos, setVideos] = useState<ResultsType[]>([]);
    useEffect(() => {
        async function getData() {
            let parsedData = (await readCSV("/video_score.csv")) as [];
            setVideos(parsedData);
        }
        getData();
    }, []);
    return (
        <resultsContext.Provider value={videos}>
            {children}
        </resultsContext.Provider>
    );
}

export default ResultsProvider;
