import { NextFunction, Request, Response } from "express";
import { newPatientSchema } from "../utils/patientSchema";
import { z } from "zod";

const validateNewPatient = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate the request body using the Zod schema
        newPatientSchema.parse(req.body);
        next(); // Move to the next middleware or route handler
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Return validation errors as response
            return res.status(400).json({ error: (error as z.ZodError).issues });
        }
        next(error); // Pass other errors to the error handler
    }
};

export default validateNewPatient;
