import drugJson from "@/assets/data/drugData.json";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import type { Drug } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";

export const DrugCard = ({
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
};

const DrugList = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }} className=" bg-background pt-2">
      <KeyboardAvoidingView className="flex-1 ">
        <FlatList
          data={drugJson}
          renderItem={({ item }) => <DrugCard key={item.no} {...item} />}
          contentContainerStyle={{ gap: 4, paddingHorizontal: 16 }}
        />
        <Input
          className="border m-2  rounded-md text-black"
          placeholder="Search Drugs..."
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default DrugList;
