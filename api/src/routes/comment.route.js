import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateCreateComment } from "../middlewares/validators/comment.js";
import {
  createComment,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/create", isAuthenticated, validateCreateComment, createComment);
router.put("/likeComment/:commentId", isAuthenticated, likeComment);

export default router;
