import type { Drug } from "@/types";
import { Link } from "expo-router";
import React, { memo } from "react";
import { Pressable, View } from "react-native";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Text } from "./ui/text";

const DrugCard = memo(
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
      <Link
        href={{
          pathname: "/drug-list/[no]",
          params: {
            no,
            brandName,
            genericName,
            dosageFormName,
            strength,
            packSize,
            companyName,
            countryOfOrigin,
            agentName,
          },
        }}
        asChild
        push
      >
        <Pressable>
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
        </Pressable>
      </Link>
    );
  },
);
DrugCard.displayName = "DrugCard";

export default DrugCard;
