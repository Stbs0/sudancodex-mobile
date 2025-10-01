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
    .min(1, "Age must be 1 or 2 digits")
    .max(2, "Age must be 1 or 2 digits")
    .trim()
    .nonempty({ message: "Age is required" }),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .trim()
    .regex(phoneRegex, 'Invalid Number - must be like "+XXX"')
    .nonempty({ message: "Phone number is required" }),

  university: z.string().trim().nonempty({
    message: "University is required",
  }),
  occupation: occupationEnum,
});
export type tellUsMoreSchemaType = z.infer<typeof tellUsMoreSchema>;
