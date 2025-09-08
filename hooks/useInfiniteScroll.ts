import type { Drug } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useDeferredValue, useEffect, useState } from "react";

export const useInfiniteScroll = () => {
  const db = useSQLiteContext();
  const [drugList, setDrugList] = useState<Drug[]>([]);
  const [search, setSearch] = useState("");
  console.log(search);
  const defferedSearch = useDeferredValue(search);
  useEffect(() => {
    db.getAllAsync("SELECT * FROM mytable LIMIT 20;").then((res) =>
      setDrugList(res as Drug[]),
    );

    console.log("hi");
  }, []);

  const fetchMore = async () => {
    const res = await db.getAllAsync(
      `SELECT * FROM mytable LIMIT 10 OFFSET $value;`,
      drugList.length,
    );

    setDrugList((prev) => [...prev, ...(res as Drug[])]);
  };
  return { fetchMore, drugList, setSearch };
};
