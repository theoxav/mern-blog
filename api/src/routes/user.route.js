import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import {
  isAdmin,
  isAuthenticated,
  isUserAuthorized,
} from "../middlewares/authMiddleware.js";
import { validateUserUpdate } from "../middlewares/validators/user.js";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, getUsers);
router.put(
  "/update/:userId",
  isAuthenticated,
  validateUserUpdate,
  isUserAuthorized,
  updateUser
);
router.delete("/delete/:userId", isAuthenticated, isAdmin, deleteUser);
router.get("/:userId", getUser);

export default router;
