import express from "express";
import Database from "./database/connection.js";
import router from "./routes/index.js";
import ErrorHandler from "./middlewares/ErrorHandler.js";

const app = express();
app.use(express.json());

Database.getInstance();

app.use("/api", router);

app.use(ErrorHandler);

export default app;
