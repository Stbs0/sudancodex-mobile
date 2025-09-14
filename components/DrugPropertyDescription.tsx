import { cn } from "@/lib/utils";
import type { DrugProperty } from "@/types";
import { View } from "react-native";
import { Text } from "./ui/text";

type Props = { title: string; property: DrugProperty; className?: string };

const DrugPropertyDescription = ({
  title,
  property,
  className = "",
}: Props) => {
  return (
    <View
      className={cn(
        "flex flex-col gap-1 border-l-2 border-blue-400 p-2",
        className,
      )}
    >
      <Text className="font-medium text-gray-500">{title}</Text>
      <Text>{property}</Text>
    </View>
  );
};

export default DrugPropertyDescription;
