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

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
    // Validate input types
    if (dailyHours.some((hours) => isNotNumber(hours)) || isNotNumber(target)) {
        throw new Error("Provided values must be numbers!");
    }

    // Validate non-negative values
    if (dailyHours.some((hours) => hours < 0)) {
        throw new Error("Daily hours must be non-negative numbers!");
    }
    if (target < 0) {
        throw new Error("Target must be a non-negative number!");
    }

    // Validate non-empty array
    if (dailyHours.length === 0) {
        throw new Error("Daily hours array must not be empty!");
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
