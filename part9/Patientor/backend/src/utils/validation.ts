import { NewPatient, Gender } from "../types/patient";

// Type guard for Gender
const isGender = (param: unknown): param is Gender => {
    return Object.values(Gender).includes(param as Gender);
};

// Validate string
const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseString = (value: unknown, fieldName: string): string => {
    if (!value || !isString(value)) {
        throw new Error(`Invalid or missing ${fieldName}`);
    }
    return value;
};

// Validate date
const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (value: unknown): string => {
    if (!value || typeof value !== "string" || !isDate(value)) {
        throw new Error("Invalid or missing date");
    }
    return value;
};

// Validate gender
const parseGender = (value: unknown): Gender => {
    if (!value || !isGender(value)) {
        throw new Error("Invalid or missing gender");
    }
    return value;
};

// Validate occupation
const parseOccupation = (value: unknown): string => {
    return parseString(value, "occupation");
};

// Create a new patient with validation
export const toNewPatient = (object: {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
}): NewPatient => {
    return {
        name: parseString(object.name, "name"),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn, "ssn"),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };
};

export default toNewPatient;
