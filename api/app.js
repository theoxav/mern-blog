import express from "express";
import Database from "./database/connection.js";
import router from "./routes/index.js";

const app = express();
Database.getInstance();

app.use("/api", router);

export default app;
