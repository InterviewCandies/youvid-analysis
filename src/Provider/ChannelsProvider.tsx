import React, { createContext, useEffect, useState } from "react";
import { ChannelType } from "../types/types";
import { readCSV } from "../utils/readCSV";
export const channelsContext = createContext<ChannelType[]>([]);

function ChannelsProvider({ children }: { children: JSX.Element }) {
  const [videos, setVideos] = useState<ChannelType[]>([]);
  useEffect(() => {
    async function getData() {
      let parsedData = (await readCSV("/channels.csv")) as [];
      setVideos(parsedData);
    }
    getData();
  }, []);
  return (
    <channelsContext.Provider value={videos}>
      {children}
    </channelsContext.Provider>
  );
}

export default ChannelsProvider;
