import React from "react";
import { createContext } from "react";
import {CategoryType} from "../types/types";
import data from "../assets/data/channel_cate_2_profiling.json";
import {groupByMonth} from "../utils/groupByMonth";
import buildDataList from "../utils/buildDataList";

export const categoriesContext = createContext<CategoryType[]>([]);

export default function CategoriesProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  React.useEffect(() => {
    const cate = buildDataList(data)
    setCategories(cate);
  }, []);

  return (
    <categoriesContext.Provider value={categories}>
      {children}
    </categoriesContext.Provider>
  );
}
