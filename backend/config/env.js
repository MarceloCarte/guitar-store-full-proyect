import { config } from "dotenv";

config({ path: '.env.process.local'})

export const {
PORT,
DB_HOST,
DB_USER,
DB_PASSWORD,
DB_NAME,
JWT_SECRET,
JWT_EXPIRES_IN,
} = process.env