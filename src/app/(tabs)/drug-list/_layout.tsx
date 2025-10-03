import { Icon } from "@/components/ui/icon";
import { Stack } from "expo-router";
import { Info } from "lucide-react-native";
const Tour = ({
  tintColor,
}: {
  tintColor?: string | undefined;
  canGoBack?: boolean | undefined;
}) => {
  return <Icon className="size-6 mr-4" color={tintColor} as={Info} />;
};
export default function DrugListLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: (props) => <Tour {...props} />,

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
