import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateCreateComment } from "../middlewares/validators/comment.js";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/create", isAuthenticated, validateCreateComment, createComment);

export default router;
