import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  getPostById,
  updatePost,
  getPostBySlug,
} from "../controllers/post.controller.js";
import { validateCreatePost } from "../middlewares/validators/post.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/slug/:slug", getPostBySlug);
router.post("/create", validateCreatePost, createPost);
router.put("/:id", isAuthenticated, isAdmin, validateCreatePost, updatePost);
router.delete("/:id", isAuthenticated, isAdmin, deletePost);

export default router;
