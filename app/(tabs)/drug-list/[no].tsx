import DrugPropertyDescription from "@/components/DrugPropertyDescription";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getDrugInfo } from "@/services/drugServices";
import type { Drug } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";

const propToDelete = [
  "spl_patient_package_insert",
  "spl_patient_package_insert_table",
  "spl_unclassified_section",
  "spl_product_data_elements",
];

const DrugInfo = () => {
  const drug = useLocalSearchParams() as Drug;
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  const [searchInputs, setSearchInputs] = useState({
    generic: drug.genericName,
    refetch: false,
    route: "",
  });
  const path = usePathname();
  console.log(path);
  // console.log(drug);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: drug.brandName });
  }, []);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["drugInfo", drug.no],

    queryFn: () => {
      return getDrugInfo(
        searchInputs.generic,

        searchInputs.route,
        searchInputs.refetch,
      );
    },
    select: (values) => {
      delete values.openfda;
      return values;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, route: string) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const genericName = formData.get("genericName") as string;

    const submittedData = {
      generic: genericName.trim(),

      refetch: true,
      route,
    };
    setSearchInputs(submittedData);
    queryClient.removeQueries({ queryKey: ["drugInfo", drug.no] });
  };
  if (isError) return <Text>error</Text>;
  if (isLoading) return <Text>Louding</Text>;
  if (!data) return <Text>no data</Text>;
  console.log(data);
  const keys = Object.keys(data)
    .filter((key) => Array.isArray(data[key]) && !propToDelete.includes(key))
    .sort((a, b) => a.localeCompare(b));

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 8 }} // works like className="mx-2"
      showsVerticalScrollIndicator={true} // optional
    >
      <Card className="py-4 w-full px-2">
        <CardTitle className="text-center">{drug.brandName}</CardTitle>
        <CardContent className="gap-2 w-full">
          <View className="gap-2">
            <DrugPropertyDescription
              title="Generic Name"
              className="border-red-400"
              property={drug.genericName}
            />
            <DrugPropertyDescription
              title="Dosage Form"
              className="border-green-400"
              property={drug.dosageFormName}
            />
            <DrugPropertyDescription
              title="Strength"
              className="border-yellow-400"
              property={drug.strength}
            />
            <DrugPropertyDescription
              title="Pack Size"
              className="border-gray-400"
              property={drug.packSize}
            />
            <DrugPropertyDescription
              title="Agent"
              property={drug.agentName}
              className="border-white"
            />
            <DrugPropertyDescription
              title="Company Name"
              className="border-purple-400"
              property={drug.companyName}
            />
            <DrugPropertyDescription
              title="Country of Origin"
              property={drug.countryOfOrigin}
            />
          </View>
        </CardContent>
      </Card>

      <View className="w-full mt-4">
        <Accordion type="multiple" collapsable>
          {keys.map((key, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <Text>{key.replace(/_/g, " ").toUpperCase()}</Text>
              </AccordionTrigger>
              <AccordionContent>
                {/* render array properly */}
                {Array.isArray(data[key]) ? (
                  data[key].map((line, i) =>
                    line.startsWith("<") ? (
                      <RenderHtml
                        key={index}
                        contentWidth={width}
                        source={{ html: line }}
                      />
                    ) : (
                      <Text key={i}>{line}</Text>
                    ),
                  )
                ) : (
                  <Text>{data[key]}</Text>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </View>
    </ScrollView>
  );
};
export default DrugInfo;
