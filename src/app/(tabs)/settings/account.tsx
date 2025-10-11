import { Button } from "@/components/ui/button";
import { deleteUserData, signOutUser } from "@/services/usersServices";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, View } from "react-native";

const Account = () => {
  const { t } = useTranslation();

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
  const onSignOut = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    signOutUser();
  };
  return (
    <View className=" gap-4">
      <Link href={"/about"} asChild>
        <Button variant={"outline"}>
          <Text className="text-center  font-bold">{t("settings.about")}</Text>
        </Button>
      </Link>
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
  );
};

export default Account;
