import { AuthProvider } from "@/components/providers/AuthProvider";
import { useColorScheme } from "@/components/useColorScheme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "YOUR_WEB_CLIENT_ID",
      offlineAccess: true,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar />
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='modal'
          options={{ presentation: "modal" }}
        />
      </Stack>
      <PortalHost />
    </>
  );
}
