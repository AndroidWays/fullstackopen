import { calculateBmi } from "../src/bmiCalculator";

describe("calculateBmi", () => {
    test("returns 'Underweight' for height 180 and weight 50", () => {
        expect(calculateBmi(180, 50)).toBe("Underweight");
    });

    test("returns 'Normal range' for height 180 and weight 74", () => {
        expect(calculateBmi(180, 74)).toBe("Normal range");
    });

    test("returns 'Overweight' for height 180 and weight 90", () => {
        expect(calculateBmi(180, 90)).toBe("Overweight");
    });

    test("returns 'Obese' for height 180 and weight 120", () => {
        expect(calculateBmi(180, 120)).toBe("Obese");
    });

    test("throws an error if height is zero", () => {
        expect(() => calculateBmi(0, 74)).toThrow("Height must be a positive number!");
    });

    test("throws an error if weight is negative", () => {
        expect(() => calculateBmi(180, -74)).toThrow("Weight must be a positive number!");
    });
});
