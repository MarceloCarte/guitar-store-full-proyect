import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const connectToDB = async () => {
  if (!DB_URI) {
    throw new Error(
      "Please define the MONGODB_URI enviroment inside .env.local"
    );
  }

  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to DataBase`);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectToDB;
