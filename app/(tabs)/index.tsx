import DrugList from "@/components/DrugList";
import React from "react";
import { KeyboardAvoidingView, View } from "react-native";

const DrugListScreen = () => {
  return (
    <View style={{ flex: 1 }} className=" bg-background pt-2">
      <KeyboardAvoidingView className="flex-1 ">
        <DrugList />
      </KeyboardAvoidingView>
    </View>
  );
};

export default DrugListScreen;
