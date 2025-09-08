import DrugList from "@/components/DrugList";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { Drug } from "@/types";
import React, { memo } from "react";
import { KeyboardAvoidingView, View } from "react-native";

export const DrugCard = memo(
  ({
    no,
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
// const ITEM_HEIGHT = 120; // approximate height
// const getItemLayout = (_: any, index: number) => ({
//   length: ITEM_HEIGHT,
//   offset: ITEM_HEIGHT * index,
//   index,
// });

const DrugListScreen = () => {
  return (
    <View style={{ flex: 1 }} className=" bg-background pt-2">
      <KeyboardAvoidingView className="flex-1 ">
        <DrugList />
      </KeyboardAvoidingView>
    </View>
  );
};

export default DrugListScreen;
