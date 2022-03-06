import React, { createContext, useEffect, useState } from "react";
import { ChannelType } from "../types/types";
import channelData from "../assets/data/channel_profiling.json";
import buildDataList from "../utils/buildDataList";
export const channelsContext = createContext<ChannelType[]>([]);

function ChannelsProvider({ children }: { children: JSX.Element }) {
  const [channels, setChannels] = useState<ChannelType[]>([]);
  useEffect(() => {
    const data = buildDataList(channelData);
    setChannels(data);
  }, []);
  return (
    <channelsContext.Provider value={channels}>
      {children}
    </channelsContext.Provider>
  );
}

export default ChannelsProvider;
