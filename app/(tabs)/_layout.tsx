import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentPropsWithoutRef<typeof Ionicons>["name"];

  color: string;
}) {
  return (
    <Ionicons
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Drug List",
          tabBarLabel: "Drug List",

          tabBarIcon: (props) => (
            <TabBarIcon
              name='list'
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: (props) => (
            <TabBarIcon
              name='person'
              {...props}
            />
          ),
        }}
      />
    </Tabs>
  );
}
