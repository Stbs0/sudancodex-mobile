import { DrugCard } from "@/app/(tabs)";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Drug } from "@/types";
import React, { useCallback } from "react";
import {
  FlatList,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
} from "react-native";
import { Input } from "./ui/input";

const DrugList = () => {
  const { drugList, fetchMore, setSearch } = useInfiniteScroll();
  const renderItem = useCallback(({ item }: { item: Drug }) => {
    return <DrugCard {...item} />;
  }, []);
  const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearch(e.nativeEvent.text);
  };
  return (
    <>
      <FlatList
        // getItemLayout={getItemLayout}
        data={drugList}
        renderItem={renderItem}
        keyExtractor={(item) => {
          // console.log("key", item.no);
          return item.no;
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ gap: 4, paddingHorizontal: 16 }}
        onEndReached={fetchMore}
      />
      <Input
        onChange={handleInput}
        className="border m-2  rounded-md text-black"
        placeholder="Search Drugs..."
      />
    </>
  );
};

export default DrugList;
