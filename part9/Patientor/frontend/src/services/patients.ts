import axios from "axios";
import { Patient, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

// Fetch all patients
const getAll = async (): Promise<Patient[]> => {
    try {
        const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
        return data;
    } catch (error) {
        console.error("Failed to fetch patients:", error);
        throw error; // Re-throw the error for the caller to handle
    }
};

// Create a new patient
const create = async (object: PatientFormValues): Promise<Patient> => {
    try {
        const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
        return data;
    } catch (error) {
        console.error("Failed to create a patient:", error);
        throw error; // Re-throw the error for the caller to handle
    }
};

export default {
    getAll,
    create,
};
