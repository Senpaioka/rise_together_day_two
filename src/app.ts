import express, { type Application, type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from './app/routes/routers';

const app: Application = express();

// global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// server health check
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is running."
    });
});

// routes
app.use('/api/v1', router);

// Not found route
app.use( (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found!"
    });
});

// global error handler
app.use( (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
});


export default app;