import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DrugList = () => {
  const [state, setState] = useState({ userInfo: null });
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setState({ userInfo: response.data });
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  return (
    <SafeAreaView className='flex-1'>
      <View className='bg-green-200'>
        <Text className='text-3xl text-green-400'>DrugList</Text>''
      </View>
      <GoogleSigninButton 
        onPress={async () => {
          await signIn();
        }}
      />
    </SafeAreaView>
  );
};

export default DrugList;
