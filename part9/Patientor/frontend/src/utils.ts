// utils.ts
export const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value, null, 2)}`);
};
