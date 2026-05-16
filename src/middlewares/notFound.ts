import {Request, Response, NextFunction} from "express";
import status from "http-status";
import AppError from "../utils/appError.js";

const notFound = (
    req: Request,
    res: Response,
    next: NextFunction ) => {

    next(
        new AppError(
            status.NOT_FOUND,
            `Route not found: ${req.originalUrl}`
        )
    );
};

export default notFound;