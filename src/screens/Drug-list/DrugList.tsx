import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import ModalProvider from "@/providers/ModalProvider";
import DrugCard from "@/screens/Drug-list/DrugCard/DrugCard";
import type { Drug } from "@/types";
import { LegendList, type LegendListRef } from "@legendapp/list";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import CardModal from "./CardModal";

const DrugList = () => {
  const {
    drugList,
    fetchNextPage,
    setSearch,
    isFetchingNextPage,
    error,
    isLoading,
    hasNextPage,
    defferedSearch,
  } = useInfiniteScroll();
  const listRef = useRef<LegendListRef | null>(null);
  useEffect(() => {
    console.log("ref", listRef.current);
    listRef.current?.scrollToOffset?.({ offset: 0, animated: true });
  }, [defferedSearch]);

  const renderItem = useCallback(({ item }: { item: Drug }) => {
    return <DrugCard {...item} />;
  }, []);

  const debouncedSetSearch = useMemo(() => {
    let t: number | null = null;
    return (q: string) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        setSearch(q);
      }, 500);
    };
  }, [setSearch]);

  if (error) return <Text className="text-destructive">{String(error)}</Text>;

  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginTop: 16 }} />;

  return (
    <ModalProvider>
      <LegendList
        recycleItems={true}
        // getItemLayout={getItemLayout}
        data={drugList}
        ref={listRef}
        renderItem={renderItem}
        className="pt-4 "
        keyExtractor={(item) => item.no}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
      <CardModal />
      <View className="m-2 mt-0 dark:bg-black">
        <Input
          onChangeText={debouncedSetSearch}
          className="border rounded-md "
          placeholder="Search Drugs. .."
        />
      </View>
    </ModalProvider>
  );
};

export default DrugList;
