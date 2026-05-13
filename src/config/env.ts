import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: Number(process.env.PORT) || 3000,
}

export default env;