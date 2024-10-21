import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateCreateComment } from "../middlewares/validators/comment.js";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/create", isAuthenticated, validateCreateComment, createComment);
router.put("/likeComment/:commentId", isAuthenticated, likeComment);
router.put(
  "/editComment/:commentId",
  isAuthenticated,
  validateCreateComment,
  editComment
);
router.delete("/deleteComment/:commentId", isAuthenticated, deleteComment);

export default router;
