import { Response } from "express";
import { ApiResponse } from "./apiResponse.js";

const sendResponse = <T>(
    res: Response,
    data: ApiResponse<T> ) => {

    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    });
};

export default sendResponse;

