import { useAuth } from "@/hooks/useAuth";
import { NAV_THEME } from "@/lib/theme";
import { AuthProvider } from "@/providers/AuthProvider";
import { connectAuthEmulator, getAuth } from "@react-native-firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { SplashScreen, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });
  return eventSubscription.remove;
});
export const auth = getAuth();
export const db = getFirestore();
console.log("first", __DEV__);
if (__DEV__) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

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
      <SQLite.SQLiteProvider databaseName="mergedDrug.db">
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
