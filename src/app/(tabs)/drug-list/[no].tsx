import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import DrugPropertyDescription from "@/screens/Drug-list/DrugCard/DrugPropertyDescription";
import type { Drug, DrugInfoTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
  View,
  type ColorSchemeName,
} from "react-native";
import RenderHtml, {
  type MixedStyleDeclaration,
} from "react-native-render-html";
const DrugInfo = () => {
  const drug = useLocalSearchParams() as Drug;
  const { width } = useWindowDimensions();
  const db = useSQLiteContext();
  const color = useColorScheme();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: drug.brandName });
  }, [navigation, drug.brandName]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["drugInfo", drug.no],

    queryFn: async () => {
      console.log(drug.drugInfoRef);
      return await db.getFirstAsync<DrugInfoTypes>(
        `SELECT * FROM drugInfo WHERE drug_id = ? LIMIT 1`,
        [drug.drugInfoRef],
      );
    },
  });

  if (isError) return <Text>error</Text>;
  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginTop: 16 }} />;

  if (!data) return <Text>no data</Text>;
  // console.log(data);
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={true}
    >
      <Card className="py-4 w-full ">
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

      <View className="mt-4">
        <Accordion type="multiple" collapsable>
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Title"
            content={data.title}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Clinical"
            content={data.clinical}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Indications"
            content={data.ind}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Adult"
            content={data.adult}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Ped"
            content={data.ped}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Side Effects"
            content={data.side}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Pregnancy"
            content={data.prgnancy}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Interminor"
            content={data.interminor}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Contraindications"
            content={data.contra}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Classification"
            content={data.clas}
          />
          <DrugAccordion
            colorSchema={color}
            width={width}
            trigger="Mode"
            content={data.mode}
          />
        </Accordion>
      </View>
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
  colorSchema: ColorSchemeName;
}) => {
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
          source={{ html: content }}
          // defaultTextProps={{
          //   style: { color: "white" },
          // }}
          baseStyle={{ color: colorSchema === "dark" ? "white" : "black" }}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
// const a = [
//   {
//     drug_id: 925188,
//     title: "Levetiracetam",
//     ind: "<b>FDA-Labeled Indications</b><ul><li>Myoclonic seizure; Adjunct</li><li>Partial seizure; Adjunct</li><li>Tonic-clonic seizure, Primary generalized; Adjunct</li></ul><b>Non-FDA Labeled Indications</b><ul><li>Manic bipolar I disorder</li><li>Migraine; Prophylaxis</li><li>Partial seizure, Monotherapy in newly diagnosed or untreated epilepsy</li><li>Seizure</li></ul>",
//     adult:
//       "<ul><li><b>General Dosage Information</b><br/><ul><li>Switching from IV to oral therapy: Switch therapy back to the oral route at the same daily dose and frequency as the IV administration.</li><li>Switching from oral to IV therapy: Initial total daily IV dose should be equivalent to the total daily dose and frequency of the oral dose.</li></ul></li><li><b>Myoclonic seizure; Adjunct</b><br/><ul><li>Initial, 500 mg IV/orally twice daily; increase by 1000 mg/day every 2 weeks to 3000 mg/day</li></ul></li><li><b>Partial seizure, Monotherapy in newly diagnosed or untreated epilepsy</b><br/><ul><li>500 mg orally once daily for 2 weeks, then increase to 500 mg twice daily; additional titration may occur over 2 weeks as clinically indicated to MAX 3000 mg/day (1500 mg twice daily); most patients responded to 500 mg orally twice daily in a clinical trial.</li></ul></li><li><b>Partial seizure; Adjunct</b><br/><ul><li>(Immediate-release tablets, oral disintegrating tablets, oral solution, IV) Initial, 500 mg twice daily IV/orally; may increase by 1000 mg/day every 2 weeks (2 divided doses); MAX 3000 mg/day</li><li>(Extended-release tablets) Initial, 1000 mg orally once daily; may increase by 1000 mg/day every 2 weeks; MAX 3000 mg/day</li></ul></li><li><b>Tonic-clonic seizure, Primary generalized; Adjunct</b><br/><ul><li>Initial, 500 mg IV/orally twice daily; increase by 1000 mg/day every 2 weeks to 3000 mg/day</li></ul></li></ul>",
//     ped: "<ul><li><b>General Dosage Information</b><br/><ul><li>Switching from IV to oral therapy: Switch therapy back to the oral route at the same daily dose and frequency as the IV administration.</li><li>Switching from oral to IV therapy: Initial total daily IV dose should be equivalent to the total daily dose and frequency of the oral dose.</li></ul></li><li><b>Myoclonic seizure; Adjunct</b><br/><ul><li>(12 years or older) Initial, 500 mg IV/orally twice daily; increase by 1000 mg/day every 2 weeks to 3000 mg/day</li></ul></li><li><b>Partial seizure; Adjunct</b><br/><ul><li>(Oral solution, IV; 1 month to younger than 6 months) Initial, 7 mg/kg IV/orally twice daily; increase by 14 mg/kg/day in 2 divided doses every 2 weeks to 42 mg/kg/day in 2 divided doses; the mean dose in clinical trials was 35 mg/kg/day</li><li> (Immediate-release tablets, oral solution, IV; 6 months to younger than 4 years) Initial, 10 mg/kg IV/orally twice daily; increase by 20 mg/kg/day in 2 divided doses every 2 weeks to 50 mg/kg/day in 2 divided doses as tolerated; for oral administration, use oral solution with weight of 20 kg or less; the mean dose in clinical trials was 47 mg/kg/day</li><li>(Oral solution; 4 years to younger than 16 years, less than 20 kg) Initial, 10 mg/kg orally twice daily; increase by 20 mg/kg/day in 2 divided doses every 2 weeks to 60 mg/kg/day in 2 divided doses as tolerated; the mean and MAX doses were 44 mg/kg/day and 3000 mg/day, respectively, in clinical trials</li><li>(Immediate-release tablets; 4 years to younger than 16 years, 20 to 40 kg) Initial, 250 mg orally twice daily; increase by 500 mg/day in 2 divided doses every 2 weeks to a MAX recommended dose of 1500 mg/day in 2 divided doses</li><li>(Immediate-release tablets; 4 years to younger than 16 years, greater than 40 kg) Initial, 500 mg orally twice daily; increase by 1000 mg/day every 2 weeks in 2 divided doses to a MAX of 3000 mg/day in 2 divided doses</li><li>(Oral disintegrating tablets; 4 years or older and 20 to 40 kg) Initial, 250 mg orally twice daily; increase by 500 mg/day in 2 divided doses every 2 weeks to a MAX recommended dose of 1500 mg/day in 2 divided doses</li><li>(Oral disintegrating tablet; 4 years or older and 40 kg or greater) Initial, 500 mg twice daily orally; may increase by 1000 mg/day in 2 divided doses every 2 weeks; MAX 3000 mg/day in 2 divided doses</li><li>(IV; 4 years to younger than 16 years) Initial, 10 mg/kg IV twice daily; increase by 20 mg/kg/day in 2 divided doses every 2 weeks to 60 mg/kg/day in 2 divided doses as tolerated; the mean dose in clinical trials was 44 mg/kg/day</li><li>(Extended-release tablets; 12 years or older) Initial, 1000 mg orally once daily; increase by 1000 mg/day every 2 weeks to a MAX of 3000 mg/day</li><li>(Immediate-release tablets, oral solution, IV; 16 years or older) Initial, 500 mg IV/orally twice a day; increase by 1000 mg/day every 2 weeks in 2 divided doses to a MAX of 3000 mg/day</li></ul></li><li><b>Tonic-clonic seizure, Primary generalized; Adjunct</b><br/><ul><li>(16 years or older) Initial, 500 mg IV/orally twice daily; increase by 1000 mg/day every 2 weeks to 3000 mg/day</li><li>(6 years to younger than 16 years) Initial, 10 mg/kg IV/orally twice daily; increase by 20 mg/kg/day every 2 weeks to 60 mg/kg/day (30 mg/kg twice daily); for oral administration, use oral solution in patients weighing 20 kg or less</li><li>(Spritam(TM); 6 years or older and greater than 40 kg) Initial, 500 mg orally twice daily; increase by 1000 mg/day in 2 divided doses every 2 weeks to 3000 mg/day in 2 divided doses</li><li>(Spritam(TM); 6 years or older and 20 to 40 kg) Initial, 250 mg orally twice daily; increase by 500 mg/day in 2 divided doses every 2 weeks to 1500 mg/day in 2 divided doses</li></ul></li></ul>",
//     side: "<b>Common</b><ul><li><b>Gastrointestinal:</b>Loss of appetite (3% to 8%), Vomiting (15%)</li><li><b>Immunologic:</b>Infectious disease (13%)</li><li><b>Musculoskeletal:</b>Decreased bone mineral density (70%), Neck pain (2% to 8%)</li><li><b>Neurologic:</b>Asthenia (15%), Dizziness (5% to 9%), Headache (14% to 19%)</li><li><b>Psychiatric:</b>Abnormal behavior (7% to 37.6%), Irritability (6% to 12%)</li><li><b>Respiratory:</b>Cough (2% to 9%), Nasopharyngitis (7% to 15%)</li><li><b>Other:</b>Fatigue (10% to 11%)</li></ul><b>Serious</b><ul><li><b>Dermatologic:</b>Stevens-Johnson syndrome, Toxic epidermal necrolysis due to drug</li><li><b>Hematologic:</b>Decreased erythrocyte production, Decreased white blood cell count (2.4% to 3.2%), Eosinophilia (8.6%), Neutropenia (partial onset seizures, adults, 2.4%), Pancytopenia, Thrombocytopenia</li><li><b>Hepatic:</b>Liver failure</li><li><b>Neurologic:</b>Somnolence (8% to 45%)</li><li><b>Psychiatric:</b>Suicidal intent (0.5%), Suicide</li></ul>",
//     prgnancy: "<ul><li>C (FDA)</li><li>B3 (AUS)</li></ul>",
//     intermajer:
//       "<ul><li>Methotrexate (probable)</li><li>Orlistat (probable)</li></ul>",
//     clinical:
//       "<ul><li>Instruct patient to report new or worsening depression, suicidal thoughts or behavior, psychotic symptoms, or unusual changes in mood or behavior (eg, aggression, agitation, anger, anxiety, or apathy).</li><li>Advise patient to avoid activities requiring mental alertness or coordination until drug effects are realized, as drug may cause dizziness, somnolence, and coordination difficulties.</li><li>Side effects may include asthenia, irritability, headache, nasal congestion, nasopharyngitis, decreased appetite, and infection.</li><li>Warn patient to report symptoms of serious skin reactions, such as toxic epidermal necrolysis or Stevens-Johnson syndrome.</li><li>Spritam(R): Instruct patient to take with a sip of liquid and to swallow only after tablet has dissolved.</li><li>Advise patient against sudden discontinuation of drug, as this may increase seizure frequency.</li></ul>",
//     admin:
//       "<ul><li><b>Intravenous</b><br/><ul><li>For IV infusion only</li><li>Dilute the requisite amount in 100 mL of a compatible diluent (ie, NS, LR, D5W).</li><li>Do not exceed a final MAX concentration of 15 mg/mL.</li><li>Diluted solutions are stable for up to 24 hours if stored in polyvinyl bags at controlled room temperature of 15 to 30 degrees C (59 to 86 degrees F).</li><li>Infuse IV over 15 minutes; IV bolus over 3 to 5 minutes and IV continuous infusion of 200 to 400 mg/hr have also been used in ICU patients.</li></ul></li><li><b>Oral</b><br/><ul><li>May be given with or without food</li><li>Patients weighing 20 kg or less should be dosed with the oral solution (administer with a calibrated measuring device, do not use a household measuring spoon).</li><li>Only administer whole tablets; do not chew, break, or crush tablets.</li><li>(Spritam(TM) oral disintegrating tablets) Do not push tablet through foil cover of blister packaging; peel foil from the blister using pull tab.</li><li>(Spritam(TM) oral disintegrating tablets) Place tablet on tongue and follow with sip of water; allow tablet to fully disintegrate in mouth before swallowing.</li></ul></li></ul>",
//     interminor:
//       "<ul><li>Carbamazepine (probable)</li><li>Ginkgo (probable)</li></ul>",
//     contra: null,
//     clas: "Anticonvulsant",
//     mode: "The exact mechanism of action is unknown but does not involve inhibitory and excitatory neurotransmission. Stereoselective binding of levetiracetam was confined to synaptic plasma membranes in the central nervous system with no binding occurring in peripheral tissue. Levetiracetam inhibits burst firing without affecting normal neuronal excitability, which suggests that it may selectively prevent hypersynchronization of epileptiform burst firing and propagation of seizure activity.<br/>",
//   },
// ];
