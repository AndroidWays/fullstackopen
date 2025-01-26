module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "off", // Allow explicit `any` types
        "@typescript-eslint/no-unsafe-member-access": "off", // Disable unsafe member access rule
        "@typescript-eslint/no-unsafe-assignment": "off", // Disable unsafe assignment rule
    },
};
