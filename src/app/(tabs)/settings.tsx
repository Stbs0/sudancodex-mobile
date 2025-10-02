import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { colorScheme } from "nativewind";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const SettingsScreen = () => {
  const scheme = colorScheme.get();
  const toggleTheme = () => {
    if (scheme === "light") {
      colorScheme.set("dark");
    } else {
      colorScheme.set("light");
    }
  };
  return (
    <View className="flex-1">
      <Card className="m-4 p-4">
        <CardHeader>
          <CardTitle>Change Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <Text>Current theme: {scheme}</Text>

          <Select
            defaultValue={{
              label: scheme,
              value: scheme,
            }}
            onValueChange={toggleTheme}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Theme" />
            </SelectTrigger>
            <SelectContent className="w-[180px]">
              <SelectGroup>
                <SelectLabel>Themes</SelectLabel>
                <SelectItem
                  label="Light"
                  value="light"
                  onPress={() => {
                    colorScheme.set("light");
                  }}
                />
                <SelectItem
                  label="Dark"
                  value="dark"
                  onPress={() => {
                    colorScheme.set("dark");
                  }}
                />
                {/* <SelectItem
                  label="System"
                  value="system"
                  onPress={() => {
                    setColorScheme("system");
                    Appearance.setColorScheme("");
                  }}
                /> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <TouchableOpacity onPress={async () => await signOut(getAuth())}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
