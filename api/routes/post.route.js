import express from "express";
import { createPost } from "../controllers/post.controller.js";
import { validateCreatePost } from "../middlewares/validators/post.js";

const router = express.Router();

router.post("/create", validateCreatePost, createPost);

export default router;
