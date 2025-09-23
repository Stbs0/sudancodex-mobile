import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { DrugProperty } from "@/types";
import { View } from "react-native";

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
      {Array.isArray(property) ? (
        property.map((line, i) => <Text key={i}>{line}</Text>)
      ) : (
        <Text>{String(property ?? "")}</Text>
      )}
    </View>
  );
};

export default DrugPropertyDescription;
