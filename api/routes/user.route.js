import express from "express";
import { getUsers, updateUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateUserUpdate } from "../middlewares/validators/user.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/update/:userId", isAuthenticated, validateUserUpdate, updateUser);

export default router;
