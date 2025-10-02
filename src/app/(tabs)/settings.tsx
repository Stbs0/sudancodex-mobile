import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const SettingsScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  return (
    <View className="flex-1">
      <Card className="m-4 p-4">
        <CardHeader>
          <CardTitle>Change Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="flex-row items-center gap-2">
            <Icon as={Sun} />
            <Switch
              nativeID="theme-switch"
              className=""
              checked={isDark}
              onCheckedChange={toggleColorScheme}
            />
            <Icon as={Moon} />
          </View>
          {/* <Select
            defaultValue={{
              label: colorScheme,
              value: colorScheme,
            }}
            // onValueChange={toggleTheme}
          >
            <SelectTrigger
              className="w-[180px]"
              // onPress={() => Haptics.selectionAsync()}
            >
              <SelectValue placeholder="Select a Theme" />
            </SelectTrigger>
            <SelectContent className="w-[180px]">
              <SelectGroup>
                <SelectLabel>Themes</SelectLabel>
                <SelectItem label="Light" value="light" />
                <SelectItem label="Dark" value="dark" />

              </SelectGroup>
            </SelectContent>
          </Select> */}
        </CardContent>
      </Card>
      {/* TODO: add other settings */}

      {/* <Card className="m-4 p-4">
        <CardHeader>
          <CardTitle>Font Size</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card> */}
      <TouchableOpacity onPress={async () => await signOut(getAuth())}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
