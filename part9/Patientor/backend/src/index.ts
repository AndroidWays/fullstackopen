import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import pingRouter from "./routes/ping";

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 3001; // Use environment variable for port if available

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);
app.use("/api/ping", pingRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the server: http://localhost:${PORT}`);
});
