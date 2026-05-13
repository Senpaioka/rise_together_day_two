import { Request, Response } from "express";
import { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema } from "./auth.validation";

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


// login
const login = async (req: Request, res: Response) => {

    // Validate req.body
    const result = loginSchema.safeParse(req.body);

     // Validation failed
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.issues
        });
    }
    
    // Validated data
    const { email, password } = result.data;

    // Example token
    const token = "my-login-token";

    // Set Cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Response
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            email
        }
    });
};


// change password
const changePassword = async (req: Request, res: Response) => {

    // Validate req.body
    const result = changePasswordSchema.safeParse(req.body);

    // Validation failed
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.issues
        });
    }

    // Validated data
    const {
        oldPassword,
        newPassword,
        confirmPassword
    } = result.data;


    /**
     * Here you will:
     *
     * 1. Get logged in user
     * 2. Check old password using bcrypt.compare()
     * 3. Hash new password
     * 4. Update password in database
     */

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
};


// forgot password
const forgotPassword = async (req: Request, res: Response) => {

    // Validate req.body
    const result = forgotPasswordSchema.safeParse(req.body);

    // Validation failed
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.issues
        });
    }

    // Validated data
    const { email } = result.data;

    /**
     * Here you will:
     *
     * 1. Find user by email
     * 2. Generate reset token
     * 3. Save token to database
     * 4. Send reset email
     */

    // Example reset token
    const resetToken = "reset-token-example";

    res.status(200).json({
        success: true,
        message: "Password reset link sent successfully",
        data: {
            email,
            resetToken
        }
    });
};

export default {
    register,
    login,
    changePassword,
    forgotPassword
}