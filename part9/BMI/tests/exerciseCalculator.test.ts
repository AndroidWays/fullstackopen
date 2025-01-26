import { calculateExercises } from "../src/exerciseCalculator";

describe("calculateExercises", () => {
    test("returns correct result for target 2 and daily hours [1, 0, 2, 4.5, 0, 3, 1]", () => {
        const result = calculateExercises([1, 0, 2, 4.5, 0, 3, 1], 2);
        expect(result).toEqual({
            periodLength: 7,
            trainingDays: 5,
            success: false,
            rating: 2,
            ratingDescription: "not too bad but could be better",
            target: 2,
            average: 1.6428571428571428,
        });
    });

    test("returns correct result for target 3 and daily hours [3, 3, 3, 3, 3, 3, 3]", () => {
        const result = calculateExercises([3, 3, 3, 3, 3, 3, 3], 3);
        expect(result).toEqual({
            periodLength: 7,
            trainingDays: 7,
            success: true,
            rating: 3,
            ratingDescription: "excellent",
            target: 3,
            average: 3,
        });
    });

    test("throws an error if daily hours contain negative values", () => {
        expect(() => calculateExercises([1, -2, 3], 2)).toThrow(
            "Daily hours must be non-negative numbers!"
        );
    });

    test("throws an error if target is negative", () => {
        expect(() => calculateExercises([1, 2, 3], -2)).toThrow(
            "Target must be a non-negative number!"
        );
    });
});
