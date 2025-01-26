import { isNotNumber } from "./utils";

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments = (args: string[]): { target: number; dailyHours: number[] } => {
    if (args.length < 4)
        throw new Error(
            "Not enough arguments. Usage: npm run calculateExercises <target> <dailyHours...>"
        );

    const target = Number(args[2]);
    const dailyHours = args.slice(3).map(Number);

    if (isNotNumber(target) || dailyHours.some(isNotNumber)) {
        throw new Error("Provided values must be numbers!");
    }

    if (target < 0 || dailyHours.some((hours) => hours < 0)) {
        throw new Error("Target and daily hours must be non-negative numbers!");
    }

    return { target, dailyHours };
};

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
    if (target < 0) {
        throw new Error("Target must be a non-negative number!");
    }
    if (dailyHours.some((hours) => hours < 0)) {
        throw new Error("Daily hours must be non-negative numbers!");
    }

    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((hours) => hours > 0).length;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;

    let rating;
    let ratingDescription;
    if (average < target * 0.8) {
        rating = 1;
        ratingDescription = "bad";
    } else if (average < target) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 3;
        ratingDescription = "excellent";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

// Only run if executed directly
if (require.main === module) {
    try {
        const { target, dailyHours } = parseArguments(process.argv);
        console.log(calculateExercises(dailyHours, target));
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        console.log(errorMessage);
    }
}
