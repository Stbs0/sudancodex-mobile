import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Drug } from "@/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View, type TextProps } from "react-native";

type TooltipTextProps = TextProps & {
  tooltip: string;
  children: React.ReactNode;
};

export const TooltipText = ({
  tooltip,
  children,
  ...props
}: TooltipTextProps) => (
  <Tooltip>
    <TooltipTrigger>
      <Text {...props}>{children}</Text>
    </TooltipTrigger>
    <TooltipContent>
      <Text>{tooltip}</Text>
    </TooltipContent>
  </Tooltip>
);

const DrugCardSettings = ({
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
  const { t } = useTranslation();
  return (
    <Card className="py-2 rounded-none border-2 shadow-black shadow-md">
      <CardContent className="gap-1">
        <View className="gap-1">
          <View className="flex-row flex-nowrap">
            <TooltipText tooltip={t("settings.tooltips.brandAndStrength")}>
              <Text className="font-extrabold text-neutral-700 underline decoration-rose-500 dark:text-blue-200">
                {(brandName || "NAD") + " " + (strength || "NAD")}
              </Text>
            </TooltipText>

            <Text className="font-bold"> — </Text>

            <TooltipText tooltip={t("settings.tooltips.packSize")}>
              <Text
                className="dark:text-rose-400 text-rose-500 underline decoration-rose-500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {packSize || "NAD"}
              </Text>
            </TooltipText>
          </View>

          <View className="flex-row gap-1">
            <TooltipText tooltip={t("settings.tooltips.genericName")}>
              <Text className="dark:text-green-400 text-green-500 font-extrabold underline decoration-rose-500">
                {genericName || "NAD"}
              </Text>
            </TooltipText>

            <Text className="font-bold"> — </Text>

            <TooltipText tooltip={t("settings.tooltips.dosageForm")}>
              <Text className="font-bold dark:text-blue-400 text-blue-700 underline decoration-rose-500">
                {dosageFormName || "NAD"}
              </Text>
            </TooltipText>
          </View>
        </View>

        <View className="items-start gap-1">
          <TooltipText tooltip={t("settings.tooltips.manufacturer")}>
            <Text className="text-sm font-bold dark:text-pink-400 text-pink-700 underline decoration-rose-500">
              {companyName || "NAD"}
            </Text>
          </TooltipText>

          <TooltipText tooltip={t("settings.tooltips.distributor")}>
            <Text className="text-sm font-bold dark:text-orange-400 text-orange-700 underline decoration-rose-500">
              {agentName || "NAD"}
            </Text>
          </TooltipText>

          <TooltipText tooltip={t("settings.tooltips.origin")}>
            <Text className="text-sm font-bold dark:text-violet-400 text-violet-500 underline decoration-rose-500">
              {countryOfOrigin || "NAD"}
            </Text>
          </TooltipText>
        </View>
      </CardContent>
    </Card>
  );
};
const Help = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Card className="">
        <CardHeader>
          <CardTitle>{t("settings.cardInformation")}</CardTitle>
          <CardDescription>
            {t("settings.cardInformationDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DrugCardSettings
            {...{
              agentName: "Raheeg Medical Co.Ltd",
              brandName: "Glucar",
              companyName: "Glenmark Pharmaceuticals Ltd",
              countryOfOrigin: "India",
              dosageFormName: "Tablet",
              drugInfoRef: "923394",
              genericName: "Acarbose",
              no: "1974",
              packSize: "100 Tablets",
              strength: "50 mg",
            }}
          />
        </CardContent>
      </Card>
    </View>
  );
};

export default Help;
