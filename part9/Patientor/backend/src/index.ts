import express from "express";
import cors from "cors";
import patients from "./data/patients";

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173", // Frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});

app.get("/api/patients", (_req, res) => {
    res.json(patients); // Return all patient data
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the server at: http://localhost:${PORT}`);
});
