import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Button } from "@/components/ui/button";
import { GoogleSignIn } from "@/services/authServices";

export default function ModalScreen() {
  return (
    <View>
      <Text>Modal</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        onPress={async () => {
          console.log("hi");
          try {
            const result = await GoogleSignIn();
            console.log(result);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Text>Close</Text>
      </Button>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });
