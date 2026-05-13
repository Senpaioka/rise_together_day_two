import express, { Router } from 'express';
import authController from './auth.controller';

const route: Router = express.Router();

// User registration route
route.post('/register', authController.register);

// User login route
route.post('/login', authController.login);

// change password
route.patch('/change-password', authController.changePassword);



// exporting
export const authRoutes = route;