import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateCreateComment } from "../middlewares/validators/comment.js";
import { createComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, validateCreateComment, createComment);

export default router;
