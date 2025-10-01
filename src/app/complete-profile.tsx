import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { tellUsMoreSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { completeProfile } from "@/services/usersServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm, type Control } from "react-hook-form";
import { View } from "react-native";
// import { occupationEnum } from "@/lib/schemas";
// import { OccupationEnumType } from "@/lib/schemas";

const SelectOccupation = ({
  control,
}: {
  control: Control<
    {
      age: string;
      phoneNumber: string;
      university: string;
      occupation: "Student" | "Administrator" | "Pharmacist" | "Other";
    },
    unknown,
    {
      age: string;
      phoneNumber: string;
      university: string;
      occupation: "Student" | "Administrator" | "Pharmacist" | "Other";
    }
  >;
}) => {
  return (
    <Controller
      control={control}
      name="occupation"
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <Select onValueChange={(option) => onChange(option?.value)}>
              <SelectTrigger
                className={cn("w-[180px]", error && "border-red-500")}
              >
                <SelectValue placeholder="Select Occupation" />
              </SelectTrigger>
              <SelectContent className="w-[180px]">
                <SelectGroup>
                  <SelectLabel>Occupations</SelectLabel>
                  {Occupation.map((item) => (
                    <SelectItem
                      label={item.label}
                      key={item.value}
                      value={item.value}
                    >
                      <Text>{item.label}</Text>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <FieldMessage message={error.message} />}
          </>
        );
      }}
    />
  );
};
const FieldMessage = ({ message }: { message: string | undefined }) => {
  return !message ? null : (
    <Text className="text-xs text-red-500">{message}</Text>
  );
};

const CompleteProfileScreen = () => {
  const form = useForm({
    mode: "all",
    resolver: zodResolver(tellUsMoreSchema),
  });

  const { mutate, status, error } = useMutation({
    mutationKey: ["complete-profile"],
    mutationFn: async (data: {
      age: string;
      phoneNumber: string;
      university: string;
      occupation: "Student" | "Administrator" | "Pharmacist" | "Other";
    }) => {
      return await completeProfile({ ...data, profileComplete: true });
    },
    onSuccess(data, variables, onMutateResult, context) {
      context.client.cancelQueries({ queryKey: ["user"] });
      context.client.invalidateQueries({ queryKey: ["user"] });
    },
  });
  console.log("error", error);
  // TODO: fix validation messages
  return (
    <View className="pt-safe flex-1">
      <Card className="m-4 ">
        <CardHeader>
          <CardTitle>Complete Profile</CardTitle>
          <CardDescription>
            <Text className="text-muted-foreground">
              Please complete your profile information.
            </Text>
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <View>
            <Text className="mb-2">Age</Text>
            <Controller
              control={form.control}
              name="age"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    className={error ? "border-red-500" : ""}
                    placeholder="Enter your age"
                    keyboardType="numeric"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {error && <FieldMessage message={error.message} />}
                </>
              )}
            />
          </View>
          <View>
            <Text className="mb-2">Phone Number</Text>
            <Controller
              control={form.control}
              name="phoneNumber"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    className={error ? "border-red-500" : ""}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {error && <FieldMessage message={error.message} />}
                </>
              )}
            />
          </View>

          <View>
            <Text className="mb-2">University</Text>
            <Controller
              control={form.control}
              name="university"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    className={error ? "border-red-500" : ""}
                    placeholder="Enter your University"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {error && console.log(error)}
                  {error && <FieldMessage message={error.message} />}
                </>
              )}
            />
          </View>
          <View>
            <Text className="mb-2">Occupation</Text>
            <SelectOccupation control={form.control} />
          </View>
        </CardContent>
        <CardFooter>
          <Button
            disabled={status === "pending"}
            className="w-full"
            onPress={form.handleSubmit((data) => {
              console.log(data);
              mutate(data);
            })}
          >
            <Text>Submit</Text>
          </Button>
        </CardFooter>
      </Card>
      <Button onPress={async () => signOut(getAuth())}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
};
const Occupation = [
  { label: "Student", value: "Student" },
  { label: "Administrator", value: "Administrator" },
  { label: "Pharmacist", value: "Pharmacist" },
  { label: "Other", value: "Other" },
];
export default CompleteProfileScreen;
