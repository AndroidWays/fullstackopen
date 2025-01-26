import express, { Request, Response } from "express";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = 3003;

// Endpoint: Exercise Calculator
app.post("/exercises", (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

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
