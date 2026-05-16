import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import status from "http-status";

const validateRequest = (schema: z.ZodType) => {
    return (req: Request, 
            res: Response, 
            next: NextFunction) => {
        
                try {
                    const result = schema.safeParse(req.body);

                    if(!result.success){
                        // return res.status(status.BAD_REQUEST).json({
                        //     success: false,
                        //     message: result.error.issues[0]?.message
                        // })

                        return res.status(status.BAD_REQUEST).json({
                            success: false,
                            errors: result.error.issues.map((issue) => ({
                                field: issue.path.join("."),
                                message: issue.message
                            }))
                        });
                    };
                
                    req.body = result.data;
                    next();
                
                } catch(error) {
                    next(error);
                }
            }; 
        };

export default validateRequest;