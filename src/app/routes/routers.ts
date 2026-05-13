import express, { Router } from 'express';
import {authRoutes} from '../auth/auth.routes';

const router: Router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;