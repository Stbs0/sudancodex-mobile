import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Drug } from "@/types";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { TouchableOpacity, View, type TextProps } from "react-native";

const SettingsScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  return (
    <View className="flex-1">
      <Card className="m-4 p-4">
        <CardHeader>
          <CardTitle>Change Theme</CardTitle>
        </CardHeader>
        <CardContent className="flex-row items-center justify-center gap-4">
          <Icon as={Sun} size={20} />
          <Switch
            nativeID="theme-switch"
            className=" scale-150"
            checked={isDark}
            onCheckedChange={toggleColorScheme}
          />
          <Icon as={Moon} size={20} />
        </CardContent>
      </Card>
      {/* TODO: add other settings */}

      <Card className="m-4 p-4">
        <CardHeader>
          <CardTitle>Card Information</CardTitle>
          <CardDescription>
            Press on the text to get the information
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
      <TouchableOpacity onPress={async () => await signOut(getAuth())}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

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
  drugInfoRef,
}: Drug) => {
  return (
    <Card className=" py-2 rounded-none border-2 shadow-black shadow-md">
      <CardContent className="gap-1">
        <View className="gap-1   ">
          <View className="flex-row flex-nowrap  ">
            <TooltipText tooltip="This is the brand/trade name and the concentration/strength">
              <Text className=" font-extrabold text-neutral-700  underline decoration-rose-500 decoration-2  dark:text-blue-200  ">
                {brandName || "NAD" + " " + strength || "NAD"}
              </Text>
            </TooltipText>

            <Text className="font-bold"> — </Text>

            <TooltipText tooltip="This is the pack size, i.e. the amount of tablet in the box">
              <Text
                className="dark:text-rose-400 text-rose-500 underline decoration-rose-500 decoration-2"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {packSize || "NAD"}
              </Text>
            </TooltipText>
          </View>
          <View className=" gap-1 font-bold text-sm flex-row ">
            <TooltipText tooltip="This is the generic/scientific name">
              <Text className="dark:text-green-400 text-green-500 font-extrabold underline decoration-rose-500 decoration-2">
                {genericName || "NAD"}
              </Text>
            </TooltipText>

            <Text className="font-bold text-sm "> — </Text>
            <TooltipText tooltip="This is the dosage form, e.g. tablet, capsule, suspension, etc.">
              <Text className="font-bold dark:text-blue-400 text-blue-700 underline decoration-rose-500 decoration-2">
                {dosageFormName || "NAD"}
              </Text>
            </TooltipText>
          </View>
        </View>

        <View className="items-start gap-1 ">
          <TooltipText tooltip="This is the company name, i.e. the manufacturer">
            <Text
              className="text-sm font-bold dark:text-pink-400 text-pink-700 underline decoration-rose-500 decoration-2"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {companyName || "NAD"}
            </Text>
          </TooltipText>

          <TooltipText tooltip="This is the agent name i.e. the distributor. for example Amipharma">
            <Text
              className="text-sm font-bold dark:text-orange-400 text-orange-700 underline decoration-rose-500 decoration-2"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {agentName || "NAD"}
            </Text>
          </TooltipText>
          <TooltipText tooltip="This is the country of origin">
            <Text
              className="text-sm font-bold dark:text-violet-400 text-violet-500 underline decoration-rose-500 decoration-2"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {countryOfOrigin || "NAD"}
            </Text>
          </TooltipText>
        </View>
      </CardContent>
    </Card>
  );
};
type TooltipTextProps = TextProps & {
  tooltip: string;
  children: React.ReactNode;
};

export const TooltipText = ({
  tooltip,
  children,
  ...props
}: TooltipTextProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Text {...props}>{children}</Text>
      </TooltipTrigger>
      <TooltipContent>
        <Text>{tooltip}</Text>
      </TooltipContent>
    </Tooltip>
  );
};
