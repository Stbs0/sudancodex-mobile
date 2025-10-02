import { z } from "zod";

export const occupationEnum = z.enum([
  "Student",
  "Administrator",
  "Pharmacist",
  "Other",
]);
export type OccupationEnumType = z.infer<typeof occupationEnum>;
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
export const tellUsMoreSchema = z.object({
  age: z
    .string()
    .trim()
    .regex(/^\d{1,2}$/, "Age must be 1 or 2 digits")
    .refine((val) => {
      const num = parseInt(val, 10);
      return num >= 1 && num <= 120;
    }, "Age must be between 1 and 120"),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(
      phoneRegex,
      "Phone number must begin with country code, e.g. +249912345678",
    )
    .nonempty({ message: "Phone number is required" }),

  university: z.string().trim().nonempty({
    message: "University is required",
  }),
  occupation: occupationEnum,
});
export type tellUsMoreSchemaType = z.infer<typeof tellUsMoreSchema>;
