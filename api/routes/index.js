import express from "express";
import userRoutes from "./user.route.js";
import AuthRoutes from "./auth.route.js";
import PostRoutes from "./post.route.js";
import CommentRoutes from "./comment.route.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", AuthRoutes);
router.use("/posts", PostRoutes);
router.use("/comments", CommentRoutes);

export default router;
