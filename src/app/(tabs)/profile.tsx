import { Text } from "@/components/ui/text";
import { getAuth, signOut } from "@react-native-firebase/auth";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const Profile = () => {
  return (
    <View>
      <TouchableOpacity onPress={async () => await signOut(getAuth())}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
