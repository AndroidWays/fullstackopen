import express, { Request, Response } from "express";
import { calculateExercises } from "./exerciseCalculator";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = 3003;

// Endpoint: Hello Full Stack!
app.get("/hello", (_req: Request, res: Response) => {
    res.send("Hello Full Stack!");
});

// Endpoint: BMI Calculator
app.get("/bmi", (req: Request, res: Response) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    // Validate query parameters
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    try {
        const bmi = calculateBmi(height, weight);
        return res.json({ weight, height, bmi });
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        return res.status(500).json({ error: errorMessage });
    }
});

// Endpoint: Exercise Calculator
app.post("/exercises", (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target } = req.body as { daily_exercises: any; target: any };

    // Validate input
    if (!daily_exercises || !target) {
        return res.status(400).json({ error: "parameters missing" });
    }

    if (
        !Array.isArray(daily_exercises) ||
        daily_exercises.some((hours) => isNaN(Number(hours))) ||
        isNaN(Number(target))
    ) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    try {
        const result = calculateExercises(daily_exercises.map(Number), Number(target));
        return res.json(result);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        return res.status(500).json({ error: errorMessage });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the server at: http://localhost:${PORT}`);
});
