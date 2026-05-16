import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from './app/routes/routers.js';
import globalError from "./middlewares/globalErrors.js";
import notFound from "./middlewares/notFound.js";

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
app.use(notFound);

// global error handler
app.use(globalError);


export default app;