import { z } from "zod";

// register Validation Schema
export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters"),

    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
}).strict();



// Login Validation Schema
export const loginSchema = z.object({
    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});


// Change Password Schema
export const changePasswordSchema = z.object({
    oldPassword: z
        .string()
        .min(6, "Old password must be at least 6 characters"),

    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters"),

    confirmPassword: z
        .string()
        .min(6, "Confirm password must be at least 6 characters")
})
.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});


// Forgot Password Schema
export const forgotPasswordSchema = z.object({
    email: z
        .email("Invalid email address")
});


// Generate TypeScript type from schema
export type RegisterUser = z.infer<typeof registerSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;