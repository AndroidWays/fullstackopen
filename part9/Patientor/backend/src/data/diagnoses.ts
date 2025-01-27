interface Diagnosis {
    code: string;
    name: string;
    latin?: string; // Optional field
}

const diagnoses: Diagnosis[] = [
    {
        code: "M24.2",
        name: "Disorder of ligament",
        latin: "Morbositas ligamenti",
    },
    {
        code: "M51.2",
        name: "Other specified intervertebral disc displacement",
    },
    {
        code: "S03.5",
        name: "Sprain and strain of joints and ligaments of head",
    },
    {
        code: "J10.1",
        name: "Flu with respiratory manifestations",
        latin: "Influenza cum manifestationibus respiratoriis",
    },
];

export default diagnoses;
