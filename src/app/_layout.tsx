import { AuthProvider } from "@/components/providers/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { NAV_THEME } from "@/lib/theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack, usePathname } from "expo-router";
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

GoogleSignin.configure({
  webClientId:
    "123556291346-646g4vti7nnir7v8dmvtshtla9ujtutq.apps.googleusercontent.com",
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SQLite.SQLiteProvider
        databaseName="drugData.db"
        assetSource={{
          assetId: require("../assets/data/drugData.db"),
          forceOverwrite: true,
        }}
      >
        <AuthProvider>
          <ThemeProvider
            value={scheme === "dark" ? NAV_THEME.dark : NAV_THEME.light}
          >
            <SafeAreaProvider>
              <RootLayoutNav />
            </SafeAreaProvider>
          </ThemeProvider>
        </AuthProvider>
      </SQLite.SQLiteProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const { user, userLoading } = useAuth();
  useEffect(() => {
    if (userLoading) {
      return;
    }
    SplashScreen.hideAsync();
    // if (isError) {
    //   console.error(error);
    // }
  }, [userLoading]);
  if (userLoading) {
    return null;
  }
  return (
    <>
      <StatusBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="auth" />
        </Stack.Protected>
      </Stack>
      <PortalHost />
    </>
  );
}
