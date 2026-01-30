import { connectDB } from "@restful-blogging-api/db";
import { env } from "bun";
import express from "express";
import cors from "cors";
import router from "./routes/posts.route";

export async function startServer() {
    await connectDB();

    // basic setup
    const app = express();
    // if I develop a frontend for it later down the road
    app.use(
        cors({
            origin: env.CORS_ORIGIN,
            methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
        }),
    );
    app.use(express.json());

    // routes
    app.use("/posts", router);

    app.get("/", (_req, res) => {
        res.status(200).send("OK");
    });

    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}
