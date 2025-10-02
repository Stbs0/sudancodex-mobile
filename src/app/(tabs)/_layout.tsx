import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

function TabBarIcon(props: {
  name: React.ComponentPropsWithoutRef<typeof Ionicons>["name"];

  color: string;
}) {
  return <Ionicons style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="drug-list"
        options={{
          title: "Drug List",
          tabBarLabel: "Drug List",
          headerShown: false,
          tabBarIcon: (props) => <TabBarIcon name="list" {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: (props) => <TabBarIcon name="settings" {...props} />,
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
