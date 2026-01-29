import { env } from "@restful-blogging-api/env/server";
import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(env.DATABASE_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database:", error);
        process.exit(1);
    }
}
