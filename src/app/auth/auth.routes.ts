import express, { Router } from 'express';
import authController from './auth.controller';

const route: Router = express.Router();

// User registration route
route.post('/register', authController.register);



// exporting
export const authRoutes = route;