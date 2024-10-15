import express from "express";
import userRoutes from "./user.route.js";
import AuthRoutes from "./auth.route.js";
import PostRoutes from "./post.route.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", AuthRoutes);
router.use("/posts", isAuthenticated, isAdmin, PostRoutes);

export default router;
