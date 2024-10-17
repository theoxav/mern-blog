import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/post.controller.js";
import { validateCreatePost } from "../middlewares/validators/post.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/create", validateCreatePost, createPost);
router.delete("/:id", isAuthenticated, isAdmin, deletePost);

export default router;
