import express from "express";
import userRoutes from "./user.route.js";
import AuthRoutes from "./auth.route.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", AuthRoutes);

export default router;
