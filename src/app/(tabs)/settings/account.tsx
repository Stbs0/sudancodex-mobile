import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { deleteUserData, signOutUser } from "@/services/usersServices";
import * as Haptics from "expo-haptics";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

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
    <View className="p-4 gap-4">
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
