import express, { Router } from "express";
import authController from "./auth.controller.js";
import validateSchema from "../../middlewares/validateSchema.js";
import {registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema} from "./auth.validation.js";

const route: Router = express.Router();

// User registration
route.post(
    "/register",
    validateSchema(registerSchema),
    authController.register
);

// User login
route.post(
    "/login",
    validateSchema(loginSchema),
    authController.login
);

// Change password
route.patch(
    "/change-password",
    validateSchema(changePasswordSchema),
    authController.changePassword
);

// Forgot password
route.post(
    "/forgot-password",
    validateSchema(forgotPasswordSchema),
    authController.forgotPassword
);

export const authRoutes = route;