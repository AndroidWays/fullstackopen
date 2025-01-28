import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

// Mute console warnings in development mode
if (process.env.NODE_ENV === "development") {
    console.warn = () => {}; // This will mute the warnings in development mode
}

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get<void>(`${apiBaseUrl}/ping`);
                const patients = await patientService.getAll();
                setPatients(patients);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        void fetchData();
    }, []);

    return (
        <div className="App">
            <Router>
                <Container>
                    <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                        Patientor
                    </Typography>
                    <Button component={Link} to="/" variant="contained" color="primary">
                        Home
                    </Button>
                    <Divider hidden />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PatientListPage patients={patients} setPatients={setPatients} />
                            }
                        />
                    </Routes>
                </Container>
            </Router>
        </div>
    );
};

export default App;
