import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DrugPropertyDescription from "@/screens/Drug-list/DrugCard/DrugPropertyDescription";
import type { Drug, DrugInfoTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { AlertCircle, FileX, Info } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml, {
  type MixedStyleDeclaration,
} from "react-native-render-html";
const DrugInfo = () => {
  const drug = useLocalSearchParams() as Drug;
  const { width } = useWindowDimensions();
  const db = useSQLiteContext();
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: drug.brandName });
  }, [navigation, drug.brandName]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["drugInfo", drug.drugInfoRef],

    queryFn: async () => {
      console.log(drug.drugInfoRef);
      return await db.getFirstAsync<DrugInfoTypes>(
        `SELECT * FROM drugInfo WHERE drug_id = ? LIMIT 1`,
        [drug.drugInfoRef],
      );
    },
  });

  return (
    <ScrollView
      // style={{ flex: 1, gap: 2 }}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={true}
      className="flex-1 gap-4 "
    >
      <Card className="py-4 mb-4 w-full ">
        <CardTitle className="text-center">{drug.brandName}</CardTitle>
        <CardContent className="gap-2 w-full">
          <View className="gap-2">
            <DrugPropertyDescription
              title="Generic Name"
              className="border-green-700 dark:border-green-400"
              property={drug.genericName}
            />
            <DrugPropertyDescription
              title="Strength"
              className="border-yellow-400"
              property={drug.strength}
            />
            <DrugPropertyDescription
              title="Pack Size"
              className="dark:border-rose-400 border-rose-700"
              property={drug.packSize}
            />
            <DrugPropertyDescription
              title="Dosage Form"
              className="border-blue-700 dark:border-blue-400"
              property={drug.dosageFormName}
            />
            <DrugPropertyDescription
              title="Company Name"
              className="border-pink-700 dark:border-pink-400 "
              property={drug.companyName}
            />
            <DrugPropertyDescription
              title="Agent"
              property={drug.agentName}
              className="border-orange-700 dark:border-orange-400 "
            />
            <DrugPropertyDescription
              title="Country of Origin"
              className="border-violet-700 dark:border-violet-400"
              property={drug.countryOfOrigin}
            />
          </View>
        </CardContent>
      </Card>
      {isError ? (
        <Text className="text-red-500">Error loading data</Text>
      ) : isLoading ? (
        <ActivityIndicator size="large" style={{ marginTop: 16 }} />
      ) : data ? (
        <View className="mt-4 gap-4">
          <View>
            <Tooltip>
              <TooltipTrigger className="flex-row items-center justify-center gap-1 opacity-80 active:opacity-100">
                <Icon as={Info} size={18} />
                <Text className="text-lg font-bold">
                  {drug.genericName} = {data.title}
                </Text>
              </TooltipTrigger>

              <TooltipContent>
                <Text>
                  Note: The Sudan drug index data provided may contain
                  formatting errors, and some information could be inaccurate.
                  Please review the details below carefully. If any information
                  does not match your records, disregard it.
                </Text>
              </TooltipContent>
            </Tooltip>
          </View>
          <View className="mt-4">
            <Accordion type="multiple" collapsible>
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Indications"
                content={data.ind}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Classification"
                content={data.clas}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Mechanism of Action"
                content={data.mode}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Clinical use"
                content={data.clinical}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Adult Dose"
                content={data.adult}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Pediatric Dose"
                content={data.ped}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Administration"
                content={data.admin}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Contraindications"
                content={data.contra}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Side Effects"
                content={data.side}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Pregnancy"
                content={data.prgnancy}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Major Interactions"
                content={data.intermajer}
              />
              <DrugAccordion
                colorSchema={colorScheme}
                width={width}
                trigger="Minor Interactions"
                content={data.interminor}
              />
            </Accordion>
          </View>
          <Alert
            icon={AlertCircle}
            className=" border-yellow-500/50 "
            iconClassName="text-yellow-500"
          >
            <AlertTitle className="font-semibold ">Disclaimer</AlertTitle>
            <AlertDescription className="text-sm leading-5">
              This app provides drug information for
              <Text className="font-semibold "> reference only</Text>. It is not
              a substitute for professional judgment or official product
              literature. Always verify details before prescribing or
              dispensing.
            </AlertDescription>
          </Alert>
        </View>
      ) : (
        <Alert icon={FileX}>
          <AlertTitle className="font-semibold ">No Data Available</AlertTitle>
          <AlertDescription className="text-sm leading-5">
            No details found for “{drug.genericName}”.
          </AlertDescription>
        </Alert>
      )}
    </ScrollView>
  );
};
export default DrugInfo;

const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
  b: {
    fontStyle: "normal",
    fontWeight: "bold",
  },
  ul: { marginVertical: 8, paddingLeft: 20 },
  li: { marginBottom: 4 },
} as const;

const DrugAccordion = ({
  trigger,
  content,
  width,
  colorSchema,
}: {
  trigger: string;
  content: string;
  width: number;
  colorSchema: "light" | "dark" | undefined;
}) => {
  const html =
    typeof content === "string" ? content : "<p><i>No data available</i></p>";
  return (
    <AccordionItem key={trigger} value={trigger}>
      <AccordionTrigger>
        <Text>{trigger.toUpperCase()}</Text>
      </AccordionTrigger>
      <AccordionContent className="">
        <RenderHtml
          tagsStyles={tagsStyles}
          enableExperimentalBRCollapsing={true}
          contentWidth={width}
          source={{ html }}
          // defaultTextProps={{
          //   style: { color: "white" },
          // }}
          baseStyle={{ color: colorSchema === "dark" ? "white" : "black" }}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
