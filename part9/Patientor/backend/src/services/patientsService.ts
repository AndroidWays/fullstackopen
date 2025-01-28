import { Patient } from "../types";

const patients: Patient[] = [
    {
        id: "1",
        name: "John Doe",
        occupation: "Teacher",
        gender: "male",
        ssn: "123-45-6789",
        dateOfBirth: "1990-01-01",
        entries: [],
    },
    {
        id: "2",
        name: "Jane Smith",
        occupation: "Engineer",
        gender: "female",
        ssn: "987-65-4321",
        dateOfBirth: "1985-05-15",
        entries: [],
    },
];

// Get non-sensitive patient data
const getNonSensitivePatients = (): Omit<Patient, "ssn">[] => {
    return patients.map(({ id, name, occupation, gender, dateOfBirth, entries }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
        entries,
    }));
};

// Add a new patient (without ssn)
const addPatient = (newPatient: Omit<Patient, "id">): Patient => {
    const id = (patients.length + 1).toString(); // Generate a simple id based on array length
    const patientWithId = { id, ...newPatient, ssn: "N/A" }; // Set ssn as "N/A" for new patients
    patients.push(patientWithId);
    return patientWithId;
};

export default { getNonSensitivePatients, addPatient };
