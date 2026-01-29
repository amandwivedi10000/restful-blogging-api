import { env } from "@restful-blogging-api/env/server";
import mongoose from "mongoose";

await mongoose.connect(env.DATABASE_URL).catch((error) => {
  console.log("Error connecting to database:", error);
});

const client = mongoose.connection.getClient().db("myDB");

export { client };
