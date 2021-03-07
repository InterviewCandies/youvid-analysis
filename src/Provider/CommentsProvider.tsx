import React from "react";
import { createContext } from "react";
import { CommentType } from "../types/types";
import { readCSV } from "../utils/readCSV";

export const commentsContext = createContext<CommentType[]>([]);

export default function CommentsPropider({
  children,
}: {
  children: JSX.Element;
}) {
  const [comments, setComments] = React.useState<CommentType[]>([]);
  React.useEffect(() => {
    async function getData() {
      let parsedData = (await readCSV("/comments.csv")) as [];
      setComments(parsedData);
    }
    getData();
  }, []);

  return (
    <commentsContext.Provider value={comments}>
      {children}
    </commentsContext.Provider>
  );
}
