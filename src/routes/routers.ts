import express, { Router } from 'express';
import {authRoutes} from '../app/auth/auth.routes.js';

const router: Router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;