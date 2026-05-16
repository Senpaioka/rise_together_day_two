import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import status from "http-status";
import { ZodError } from "zod";
import AppError from "../utils/appError.js";

const globalError: ErrorRequestHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction ) => {

    // Default values
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let message: string = "Something went wrong!";
    let errorDetails: unknown = [];

    // Zod Validation Error
    if (err instanceof ZodError) {

        statusCode = status.BAD_REQUEST;
        message = "Validation Error";

        errorDetails = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
        }));
    }

    // Custom App Error
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Generic Error
    else if (err instanceof Error) {
        message = err.message;
    }


    // Response
    res.status(statusCode).json({
        success: false,
        message,
        errors: errorDetails,
        stack:
            process.env.NODE_ENV === "DEV"
                ? err
                : undefined
    });
};

export default globalError;