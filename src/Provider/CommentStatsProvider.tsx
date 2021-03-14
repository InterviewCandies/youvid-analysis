import React from "react";
import { createContext } from "react";
import { CommentStatsType } from "../types/types";
import { readCSV } from "../utils/readCSV";

export const commentsStatsContext = createContext<CommentStatsType[]>([]);

export default function CommentStatsPropider({
  children,
}: {
  children: JSX.Element;
}) {
  const [comments, setComments] = React.useState<CommentStatsType[]>([]);
  React.useEffect(() => {
    async function getData() {
      let parsedData = (await readCSV("/comment_by_like.csv")) as [];
      setComments(parsedData);
    }
    getData();
  }, []);

  return (
    <commentsStatsContext.Provider value={comments}>
      {children}
    </commentsStatsContext.Provider>
  );
}
