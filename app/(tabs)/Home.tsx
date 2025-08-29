import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top, flex: 1 }}
      className='bg-purple-400'>
      <View className="">
        
      </View>
    </View>
  );
};

export default Home;
