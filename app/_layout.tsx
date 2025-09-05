import { AuthProvider } from "@/components/providers/AuthProvider";
import { NAV_THEME } from "@/lib/theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
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
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const scheme = useColorScheme();
  useEffect(() => {
    GoogleSignin.configure({});
    // if (!GoogleSignin.hasPreviousSignIn()) {
    //   GoogleSignin.signInSilently()
    //     .then((userInfo) => {
    //       console.log("User signed in:", userInfo);
    //     })
    //     .catch((error) => {
    //       console.error("Error signing in:", error);
    //     });
    // }
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={scheme === "dark" ? NAV_THEME.dark : NAV_THEME.light}>
      <StatusBar />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaProvider>
            <RootLayoutNav />
          </SafeAreaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  return (
    <>
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
