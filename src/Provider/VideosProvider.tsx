import React from "react";
import { createContext } from "react";
import { VideoType } from "../types/types";
import videoData from "../assets/data/video_profiling.json";
import buildDataList from "../utils/buildDataList";

export const videosContext = createContext<VideoType[]>([]);

export default function VideosProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [videos, setVideos] = React.useState<VideoType[]>([]);
  React.useEffect(() => {
      const data = buildDataList(videoData);
      setVideos(data);
  }, []);

  return (
    <videosContext.Provider value={videos}>{children}</videosContext.Provider>
  );
}
