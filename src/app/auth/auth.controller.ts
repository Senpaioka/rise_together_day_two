import { Request, Response } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { authService } from "./auth.service.js";


// registration
const register = catchAsync(async (
    req: Request,
    res: Response ) => {

    const result = await authService.registerUser(
        req.body
    );

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "User registered successfully",
        data: result
    });
});



// login
const login = catchAsync(async (
    req: Request,
    res: Response
) => {

    const result = await authService.loginUser(
        req.body
    );

    // Set token in cookie
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "User logged in successfully",
        data: {
            accessToken: result.token
        }
    });
});


// change password
// const changePassword = async (req: Request, res: Response) => {

//     // Validate req.body
//     const result = changePasswordSchema.safeParse(req.body);

//     // Validation failed
//     if (!result.success) {
//         return res.status(400).json({
//             success: false,
//             errors: result.error.issues
//         });
//     }

//     // Validated data
//     const {
//         oldPassword,
//         newPassword,
//         confirmPassword
//     } = result.data;


//     /**
//      * Here you will:
//      *
//      * 1. Get logged in user
//      * 2. Check old password using bcrypt.compare()
//      * 3. Hash new password
//      * 4. Update password in database
//      */

//     res.status(200).json({
//         success: true,
//         message: "Password changed successfully"
//     });
// };


// forgot password
// const forgotPassword = async (req: Request, res: Response) => {

//     // Validate req.body
//     const result = forgotPasswordSchema.safeParse(req.body);

//     // Validation failed
//     if (!result.success) {
//         return res.status(400).json({
//             success: false,
//             errors: result.error.issues
//         });
//     }

//     // Validated data
//     const { email } = result.data;

//     /**
//      * Here you will:
//      *
//      * 1. Find user by email
//      * 2. Generate reset token
//      * 3. Save token to database
//      * 4. Send reset email
//      */

//     // Example reset token
//     const resetToken = "reset-token-example";

//     res.status(200).json({
//         success: true,
//         message: "Password reset link sent successfully",
//         data: {
//             email,
//             resetToken
//         }
//     });
// };

export default {
    register,
    login,
}