import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { List, Settings } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="drug-list"
        options={{
          title: "Drug List",
          tabBarLabel: "Drug List",
          headerShown: false,
          tabBarIcon: (props) => <Icon as={List} {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: (props) => <Icon as={Settings} {...props} />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
