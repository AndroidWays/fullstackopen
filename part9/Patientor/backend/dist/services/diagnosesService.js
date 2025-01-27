"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses = [
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
const getDiagnoses = () => {
    return diagnoses;
};
exports.default = { getDiagnoses };
