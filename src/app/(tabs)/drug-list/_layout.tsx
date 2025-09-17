import { Stack } from "expo-router";

export default function DrugListLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Drug List",
        }}
      />
      <Stack.Screen
        name="[no]"
        options={{
          title: "",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
