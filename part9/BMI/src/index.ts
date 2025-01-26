import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({ height: Number(height), weight: Number(weight), bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
