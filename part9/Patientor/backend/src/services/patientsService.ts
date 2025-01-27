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

export default { getNonSensitivePatients };
