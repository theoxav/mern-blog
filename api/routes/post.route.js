import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
import { validateCreatePost } from "../middlewares/validators/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/create", validateCreatePost, createPost);

export default router;
