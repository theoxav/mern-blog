import express from "express";
import Database from "./database/connection.js";

const app = express();
Database.getInstance();

export default app;
