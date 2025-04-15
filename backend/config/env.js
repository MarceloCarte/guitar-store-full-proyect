import { config } from "dotenv";

config({ path: '.env.process.local'})

export const {
PORT,
DB_URI,
} = process.env