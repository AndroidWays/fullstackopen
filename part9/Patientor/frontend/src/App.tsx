import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, Divider, Container, Typography, Box } from "@mui/material"; // Import Box

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState<string | null>(null); // Add error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${apiBaseUrl}/ping`); // Keep the ping check

                const patientsPromise = patientService.getAll();
                const diagnosesPromise = diagnosisService.getAll();

                const [patients, diagnoses] = await Promise.all([
                    patientsPromise,
                    diagnosesPromise,
                ]); // Fetch in parallel

                setPatients(patients);
                setDiagnoses(diagnoses);
            } catch (err: unknown) {
                // Type the error for better handling
                console.error("Error fetching data:", err);
                if (axios.isAxiosError(err)) {
                    setError(err.message || "An error occurred."); // Set error message
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false); // Set loading to false regardless of success/failure
            }
        };

        void fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    return (
        <div className="App">
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Container>
                    <Box sx={{ marginBottom: "1rem" }}>
                        {" "}
                        {/* Use MUI Box for spacing */}
                        <Typography variant="h3">Patientor</Typography>
                        <Button component={Link} to="/" variant="contained" color="primary">
                            Home
                        </Button>
                    </Box>
                    <Divider /> {/* Remove hidden prop */}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PatientListPage patients={patients} setPatients={setPatients} />
                            }
                        />
                        <Route
                            path="/patients/:id"
                            element={<PatientPage diagnoses={diagnoses} />}
                        />
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>
    );
};

export default App;
