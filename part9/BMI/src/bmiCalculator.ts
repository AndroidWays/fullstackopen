import { isNotNumber } from "./utils";

interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4)
        throw new Error("Not enough arguments. Usage: npm run bmi <height> <weight>");
    if (args.length > 4)
        throw new Error("Too many arguments. Usage: npm run bmi <height> <weight>");

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (isNotNumber(height) || isNotNumber(weight)) {
        throw new Error("Provided values must be numbers!");
    }

    if (height <= 0 || weight <= 0) {
        throw new Error("Height and weight must be positive numbers!");
    }

    return { height, weight };
};

export const calculateBmi = (height: number, weight: number): string => {
    if (height <= 0) throw new Error("Height must be a positive number!");
    if (weight <= 0) throw new Error("Weight must be a positive number!");

    const bmi = weight / (height / 100) ** 2;

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal range";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

// Only run if executed directly
if (require.main === module) {
    try {
        const { height, weight } = parseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        console.log(errorMessage);
    }
}
