import { AuthProvider } from "@/components/providers/AuthProvider";
import { NAV_THEME } from "@/lib/theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const queryClient = new QueryClient();
// const db = SQLite.openDatabaseSync("drugData.db");
// console.log(db.getAllSync("SELECT name FROM sqlite_master WHERE type='table'"));
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const scheme = useColorScheme();

  useEffect(() => {
    GoogleSignin.configure({});
    // const dbName = "drugData.db";
    // const dbPath = `${FileSystem.documentDirectory}${dbName}`;
    // FileSystem.getInfoAsync(dbPath).then(({ exists }) => {
    //   console.log(exists);
    // });
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={scheme === "dark" ? NAV_THEME.dark : NAV_THEME.light}>
      <StatusBar />
      <QueryClientProvider client={queryClient}>
        <SQLite.SQLiteProvider
          databaseName="drugData.db"
          assetSource={{
            assetId: require("../assets//data/drugData.db"),
            forceOverwrite: true,
          }}
        >
          <AuthProvider>
            <SafeAreaProvider>
              <RootLayoutNav />
            </SafeAreaProvider>
          </AuthProvider>
        </SQLite.SQLiteProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
      <PortalHost />
    </>
  );
}
