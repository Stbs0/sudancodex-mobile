import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import type { Drug } from "@/types";
import { Link } from "expo-router";
import React, { memo } from "react";
import { Pressable, View } from "react-native";

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
    drugInfoRef,
  }: Drug) => {
    return (
      // TODO: remove the the extra params pr #10 Avoid passing all fields via route params to keep deep links small and stable.
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
            drugInfoRef,
          },
        }}
        asChild
        push
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${brandName} details`}
        >
          <Card className=" py-2 rounded-none border-2 shadow-black shadow-md">
            <CardContent className="gap-1">
              <View className="gap-1   ">
                <View className="flex-row ">
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    <Text className=" font-extrabold text-neutral-700   dark:text-blue-200  ">
                      {brandName + " " + strength}
                    </Text>
                    <Text className="font-bold"> — </Text>
                    <Text
                      className="dark:text-rose-400 text-rose-500"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {packSize}
                    </Text>
                  </Text>
                </View>
                <View className=" gap-1 font-bold text-sm ">
                  <Text numberOfLines={2} ellipsizeMode="tail">
                    <Text className="dark:text-green-400 text-green-500 font-extrabold">
                      {genericName}
                    </Text>
                    <Text className="font-bold text-sm "> — </Text>
                    <Text className="font-bold dark:text-blue-400 text-blue-700">
                      {dosageFormName}
                    </Text>
                  </Text>
                </View>
              </View>

              <View className="items-start gap-1 ">
                <Text
                  className="text-sm font-bold dark:text-pink-400 text-pink-700"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {companyName}
                </Text>
                <Text
                  className="text-sm font-bold dark:text-orange-400 text-orange-700"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {agentName}
                </Text>
                <Text
                  className="text-sm font-bold dark:text-violet-400 text-violet-500"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {countryOfOrigin}
                </Text>
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
