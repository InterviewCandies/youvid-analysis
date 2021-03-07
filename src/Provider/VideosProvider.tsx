import React from "react";
import { createContext } from "react";
import { VideoType } from "../types/types";
import { readCSV } from "../utils/readCSV";

export const videosContext = createContext<VideoType[]>([]);

export default function VideosPropider({
  children,
}: {
  children: JSX.Element;
}) {
  const [videos, setVideos] = React.useState<VideoType[]>([]);
  React.useEffect(() => {
    async function getData() {
      let parsedData = (await readCSV("/videos.csv")) as [];
      setVideos(parsedData);
    }
    getData();
  }, []);

  return (
    <videosContext.Provider value={videos}>{children}</videosContext.Provider>
  );
}
