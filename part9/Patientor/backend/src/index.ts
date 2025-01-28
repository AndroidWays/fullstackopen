import express, { Request, Response } from "express";
import cors from "cors";
import { v1 as uuid } from "uuid";
import { toNewPatient } from "./utils/validation";
import patients from "./data/patients";
import diagnoses from "./data/diagnoses";
import { Patient } from "./types/patient";

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

const PORT = 3001;

// Ping endpoint
app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

// Endpoint to fetch all diagnoses
app.get("/api/diagnoses", (_req, res) => {
    res.json(diagnoses);
});

// Endpoint to fetch all patients (without ssn)
app.get("/api/patients", (_req, res) => {
    const patientsWithoutSsn = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
    res.json(patientsWithoutSsn);
});

// Endpoint to fetch a specific patient by ID
app.get("/api/patients/:id", (req, res) => {
    const patient = patients.find((p) => p.id === req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ error: "Patient not found" });
    }
});

// Endpoint to add a new patient
app.post("/api/patients", (req: Request, res: Response) => {
    try {
        const newPatient = toNewPatient(req.body); // Validate the incoming data

        const patient: Patient = {
            id: uuid(),
            ...newPatient,
            entries: [],
        };

        patients.push(patient);

        const { ...patientWithoutSsn } = patient;
        res.json(patientWithoutSsn);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ error: errorMessage });
    }
});

// Centralized error handling
app.use((err: Error, _req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the server at: http://localhost:${PORT}`);
});
