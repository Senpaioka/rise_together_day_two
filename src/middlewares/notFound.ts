import {Request, Response, NextFunction} from "express";
import status from "http-status";

const notFound = (
    req: Request,
    res: Response,
    next: NextFunction ) => {

    res.status(status.NOT_FOUND).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
};

export default notFound;