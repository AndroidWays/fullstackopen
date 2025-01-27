import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = [
    {
        code: "D1",
        name: "Diabetes",
        latin: "Diabetes Mellitus",
    },
    {
        code: "D2",
        name: "Hypertension",
        latin: "Hypertensio",
    },
];

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default { getDiagnoses };
