import express, { Router } from 'express';
import authController from './auth.controller.js';

const route: Router = express.Router();

// User registration route
route.post('/register', authController.register);

// User login route
route.post('/login', authController.login);

// change password
route.patch('/change-password', authController.changePassword);

// forgot password
route.post('/forgot-password', authController.forgotPassword);



// exporting
export const authRoutes = route;