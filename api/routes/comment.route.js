import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { validateCreateComment } from "../middlewares/validators/comment";
import { createComment } from "../controllers/comment.controller";

const router = express.Router();

router.post("/", isAuthenticated, validateCreateComment, createComment);

export default router;
