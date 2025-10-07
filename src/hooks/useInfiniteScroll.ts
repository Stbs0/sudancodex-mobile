import type { Drug } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { useDeferredValue, useMemo, useState } from "react";

const PAGE_SIZE = 10;

export const useInfiniteScroll = () => {
  const db = useSQLiteContext();
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState<keyof Drug>("genericName");
  const defferedSearch = useDeferredValue(search);

  const {
    fetchNextPage,
    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["drugList", defferedSearch],
    queryFn: async ({ pageParam = 0 }) => {
      const searchTerm = `%${defferedSearch}%`; // LIKE %term%

      const drugs = (await db.getAllAsync(
        `
        SELECT *
        FROM drugIndex
        WHERE brandName LIKE ?
           OR genericName LIKE ?
           OR dosageFormName LIKE ?
           OR strength LIKE ?
           OR packSize LIKE ?
           OR companyName LIKE ?
           OR countryOfOrigin LIKE ?
           OR agentName LIKE ?
        ORDER BY genericName COLLATE NOCASE ASC, brandName COLLATE NOCASE ASC
        LIMIT ${PAGE_SIZE} OFFSET ?;
        `,
        [
          searchTerm,
          searchTerm,
          searchTerm,
          searchTerm,
          searchTerm,
          searchTerm,
          searchTerm,
          searchTerm,
          pageParam,
        ],
      )) as Drug[];

      return {
        drugs,
        nextPage:
          drugs.length === PAGE_SIZE ? pageParam + PAGE_SIZE : undefined,
      };
    },
    initialPageParam: 0,
    placeholderData: (prev) => prev,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Flatten all pages into a single list for convenience
  const drugList = useMemo(
    () => data?.pages.flatMap((page) => page.drugs) ?? [],
    [data],
  );
  return {
    drugList,
    search,
    setSearch,
    defferedSearch,
    setSearchBy,
    searchBy,
    fetchNextPage,

    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
  };
};
