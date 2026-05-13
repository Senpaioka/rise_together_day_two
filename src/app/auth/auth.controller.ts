import { Request, Response } from "express";
import { registerSchema } from "./auth.validation";

// registration
const register = async (req: Request, res: Response) => {

    // Validate req.body
    const result = registerSchema.safeParse(req.body);

    // Validation failed
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.issues
        });
    }

    // Validated data
    const { username, email, password } = result.data;

    // Example token
    const token = "my-secret-token";


     // Set Cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            username,
            email
        }
    });
}





export default {
    register,
}