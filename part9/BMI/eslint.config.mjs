import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config({
    files: ["src/**/*.ts"], // Lint all .ts files in the src directory
    extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    plugins: {
        "@stylistic": stylistic,
    },
    rules: {
        "@stylistic/semi": "error",
        "@typescript-eslint/no-unsafe-assignment": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/explicit-function-return-type": "error", // Enforce return types
        "@typescript-eslint/explicit-module-boundary-types": "error", // Enforce module boundary types
    },
});
