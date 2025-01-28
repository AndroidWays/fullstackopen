import { z } from "zod";

// Define the gender enum for validation
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

// Define the Zod schema for a new patient
export const newPatientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in the format YYYY-MM-DD"),
    ssn: z.string().min(1, "SSN is required"),
    gender: z.nativeEnum(Gender),
    occupation: z.string().optional(),
});

// Infer the type from the schema for TypeScript typing
export type NewPatient = z.infer<typeof newPatientSchema>;
