import express from "express";
import patientsService from "../services/patientsService";
import { NewPatient } from "../utils/patientSchema"; // Import the NewPatient type
import validateNewPatient from "../utils/validatePatient"; // Import the validation middleware

const router = express.Router();

// GET endpoint to retrieve non-sensitive patients
router.get("/", (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

// POST endpoint to add a new patient with validation
router.post("/", validateNewPatient, (req, res) => {
    try {
        const newPatient: NewPatient = req.body; // The body is validated by the middleware
        const addedPatient = patientsService.addPatient({
            ...newPatient,
            occupation: newPatient.occupation || "",
            entries: [],
        });
        res.status(201).json(addedPatient);
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
