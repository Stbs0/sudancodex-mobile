import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function DrugListLayout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ title: t("settings.header") }} />
      <Stack.Screen
        name="appearance"
        options={{
          title: "Appearance",
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: "Help",
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: "Account",
        }}
      />
    </Stack>
  );
}
