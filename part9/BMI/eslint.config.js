import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
    {
        files: ["**/*.ts"], // Lint all .ts files
        languageOptions: {
            parser: tsParser, // Use the TypeScript parser
            ecmaVersion: 2020, // Use ECMAScript 2020
            sourceType: "module", // Use ES modules
        },
        plugins: {
            "@typescript-eslint": tsPlugin, // Use the TypeScript ESLint plugin
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off", // Allow explicit `any` types
            "@typescript-eslint/no-unsafe-member-access": "off", // Disable unsafe member access rule
            "@typescript-eslint/no-unsafe-assignment": "off", // Disable unsafe assignment rule
        },
    },
];
