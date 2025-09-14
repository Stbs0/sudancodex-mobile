import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Drug } from "@/types";
import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import DrugCard from "./DrugCard";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

const DrugList = () => {
  const {
    drugList,
    fetchNextPage,
    setSearch,
    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
  } = useInfiniteScroll();

  const renderItem = useCallback(({ item }: { item: Drug }) => {
    return <DrugCard {...item} />;
  }, []);

  if (error) return <Text>error</Text>;
  if (isLoading) return <Text>loading</Text>;
  return (
    <>
      <FlatList
        // getItemLayout={getItemLayout}
        data={drugList}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.no)}
        ListFooterComponent={() => {
          if (isFetchingNextPage) return <ActivityIndicator size="large" />;
          if (!hasNextPage && drugList.length > 0)
            return (
              <Text className="text-muted-foreground text-center py-2">
                No more results
              </Text>
            );
          return null;
        }}
        onEndReachedThreshold={0.7}
        contentContainerStyle={{ gap: 4, paddingHorizontal: 16 }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
      />
      <View className="m-2">
        <Input
          onChangeText={setSearch}
          className="border   rounded-md "
          placeholder="Search Drugs. .."
        />
      </View>
    </>
  );
};

export default DrugList;
