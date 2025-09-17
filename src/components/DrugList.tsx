import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Drug } from "@/types";
import React, { useCallback, useMemo } from "react";
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

  const debouncedSetSearch = useMemo(() => {
    let t: number | null = null;
    return (q: string) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => setSearch(q), 500);
    };
  }, [setSearch]);

  if (error) return <Text className="text-destructive">{String(error)}</Text>;
  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginTop: 16 }} />;
  return (
    <>
      <FlatList
        // getItemLayout={getItemLayout}
        data={drugList}
        renderItem={renderItem}
        keyExtractor={(item) => item.no}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
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
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        keyboardShouldPersistTaps="always"
      />
      <View className="m-2">
        <Input
          onChangeText={debouncedSetSearch}
          className="border rounded-md "
          placeholder="Search Drugs. .."
        />
      </View>
    </>
  );
};

export default DrugList;
