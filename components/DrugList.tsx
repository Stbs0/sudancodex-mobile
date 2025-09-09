import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { Drug } from "@/types";
import React, { memo, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
} from "react-native";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Text } from "./ui/text";
const DrugCard = memo(
  ({
    brandName,
    genericName,
    dosageFormName,
    strength,
    packSize,
    companyName,
    countryOfOrigin,
    agentName,
  }: Drug) => {
    return (
      <Card className=" ">
        <CardContent className="gap-2">
          <View className="gap-2   ">
            <View className="flex-row gap-2">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className=" font-bold text-gray-800 shrink  dark:text-blue-200  "
              >
                {brandName}
              </Text>
              <Badge variant={"outline"} className="shrink">
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {dosageFormName}
                </Text>
              </Badge>
            </View>
            <View className="flex-row gap-1 ">
              <Badge variant={"destructive"} className="shrink">
                <Text numberOfLines={2} ellipsizeMode="tail">
                  {strength}
                </Text>
              </Badge>
              <Badge variant={"genericName"} className="shrink">
                <Text numberOfLines={2} ellipsizeMode="tail">
                  {genericName}
                </Text>
              </Badge>
            </View>
          </View>

          <View className="items-start gap-2 ">
            <Badge className="shrink">
              <Text numberOfLines={1} ellipsizeMode="tail">
                {packSize}
              </Text>
            </Badge>
            <Badge variant={"country"}>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {countryOfOrigin}
              </Text>
            </Badge>
            <Badge variant={"company"} className="shrink">
              <Text numberOfLines={1} ellipsizeMode="tail">
                {companyName}
              </Text>
            </Badge>
            <Badge variant={"agent"}>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {agentName}
              </Text>
            </Badge>
          </View>
        </CardContent>
      </Card>
    );
  },
);
DrugCard.displayName = "DrugCard";
const DrugList = () => {
  const {
    drugList,
    fetchNextPage,
    setSearch,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteScroll();

  const renderItem = useCallback(({ item }: { item: Drug }) => {
    return <DrugCard {...item} />;
  }, []);

  const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearch(e.nativeEvent.text);
  };

  //   if (isLoading) return <Text>Loading</Text>;

  if (error) return <Text>error</Text>;
  if (isLoading) return <Text>loading</Text>;
  console.log(isFetchingNextPage);
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
        ListFooterComponent={() => {
          if (isFetchingNextPage) return <ActivityIndicator size={"large"} />;
          return <Text className="flex-row justify-center">Nothing</Text>;
        }}
        onEndReachedThreshold={0.7}
        contentContainerStyle={{ gap: 4, paddingHorizontal: 16 }}
        onEndReached={() => fetchNextPage()}
      />
      <Input
        onChange={handleInput}
        className="border m-2  rounded-md "
        placeholder="Search Drugs. .."
      />
    </>
  );
};

export default DrugList;
