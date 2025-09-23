import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { View } from "react-native";
const auth = getAuth();
export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const idToken = response.data?.idToken;
        if (!idToken) {
          throw new Error("No ID token found");
        }

        const googleCredential = GoogleAuthProvider.credential(idToken);

        await signInWithCredential(auth, googleCredential);
        router.navigate("/(tabs)/drug-list");
      } else {
        // sign in was cancelled by user
        console.log("else");
      }
    } catch (error) {
      console.error("error sign up with google", error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("inprogress");
            // operation (eg. sign in) already in progress

            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the flow
            return;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Sign up or Log in
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome!
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={loading}
          />
        </CardContent>
      </Card>
    </View>
  );
}
