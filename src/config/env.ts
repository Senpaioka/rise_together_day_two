import dotenv from "dotenv";
import { z } from "zod";

// Load .env file
dotenv.config();


// Environment variable schema
const envSchema = z.object({
    PORT: z.string().default("3000"),

    NODE_ENV: z
        .enum(["DEV", "PROD", "TEST"])
        .default("DEV"),

    JWT_SECRET: z
        .string()
        .min(1, "JWT_SECRET is required"),

    DATABASE_URL: z
        .string()
        .min(1, "DATABASE_URL is required")
});


// Validate environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {

    const formattedErrors = z.treeifyError(parsedEnv.error);

    console.error("Invalid environment variables:");
    console.dir(formattedErrors, { depth: null });

    process.exit(1);
}

// Export validated env
const env = {
    PORT: Number(parsedEnv.data.PORT),
    NODE_ENV: parsedEnv.data.NODE_ENV,
    JWT_SECRET: parsedEnv.data.JWT_SECRET,
    DATABASE_URL: parsedEnv.data.DATABASE_URL
};

export default env;
