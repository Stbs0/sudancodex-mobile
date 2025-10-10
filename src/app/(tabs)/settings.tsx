import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import i18n from "@/lib/i18next";
import { deleteUserData, signOutUser } from "@/services/usersServices";
import type { Drug } from "@/types";
import * as Haptics from "expo-haptics";
import { Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, View, type TextProps } from "react-native";
import { useMMKVString } from "react-native-mmkv";

/** Centralized language definitions */
const LANGUAGE_OPTIONS = [
  { label: "English", lang: "en" },
  {
    lang: "ar",
    label: "العربية",
  },
];

const SettingsScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { t } = useTranslation();
  const isDark = colorScheme === "dark";
  const onDeletePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      t("settings.account.alertTitle"),
      t("settings.account.alertMessage"),
      [
        {
          isPreferred: true,
          text: t("settings.account.cancelBtn"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: t("settings.account.deleteBtn"),
          onPress: async () => await deleteUserData(),
          style: "destructive",
        },
      ],
    );
  };
  const switchTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleColorScheme();
  };
  const onSignOut = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    signOutUser();
  };
  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, gap: 16 }}
      showsVerticalScrollIndicator={true}
      className="flex-1"
    >
      {/* THEME SWITCH */}
      <Card className="">
        <CardHeader>
          <CardTitle>{t("settings.changeTheme")}</CardTitle>
        </CardHeader>
        <CardContent className="flex-row items-center justify-center gap-4">
          <Icon as={Sun} size={20} />
          <Switch
            nativeID="theme-switch"
            className="scale-150"
            checked={isDark}
            onCheckedChange={switchTheme}
          />
          <Icon as={Moon} size={20} />
        </CardContent>
      </Card>

      {/* DRUG CARD PREVIEW */}
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
      <LanguageChangeCard />
      {/* SIGN OUT */}
      <View className=" gap-4">
        <Button variant={"outline"} onPress={onSignOut}>
          <Text className="text-center  font-bold">
            {t("settings.account.signOut")}
          </Text>
        </Button>
        <Button variant={"destructive"} onPress={onDeletePress}>
          <Text className="text-center text-white font-bold">
            {t("settings.account.delete")}
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

/* -------------------- LANGUAGE CHANGE -------------------- */
const LanguageChangeCard = () => {
  const [lang, setLang] = useMMKVString("user.settings.language.code");
  const { t } = useTranslation();
  const switchLanguage = useCallback(
    async (newLang: string) => {
      const currentLang = i18n.language;
      if (newLang === currentLang) return;

      // Find language definition
      const langDef = LANGUAGE_OPTIONS.find((l) => l.lang === newLang);
      if (!langDef) return;

      // Store user language

      // Change language in i18n
      await i18n.changeLanguage(langDef.lang);
      setLang(langDef.lang);

      // setRtl(!rtl);

      // Alert.alert(
      //   t("settings.languageChange", { lang: langDef.label }),
      //   t("settings.restartRequired"),
      //   [
      //     {
      //       text: t("settings.restartNow"),
      //       onPress: () => Updates.reloadAsync(),
      //     },
      //   ],
      // );
    },
    [setLang],
  );
  function onLabelPress(lang: string) {
    return () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      switchLanguage(lang);
    };
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{t("settings.changeLanguage")}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={lang} onValueChange={switchLanguage}>
          {LANGUAGE_OPTIONS.map(({ lang, label }) => (
            <View key={lang} className="flex flex-row items-center gap-3">
              <RadioGroupItem value={lang} id={lang} />
              <Label onPress={onLabelPress(lang)}>{label}</Label>
            </View>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
/* -------------------- DRUG CARD -------------------- */
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

/* -------------------- TOOLTIP TEXT -------------------- */
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
