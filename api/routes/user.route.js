import express from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import {
  isAuthenticated,
  isUserAuthorized,
} from "../middlewares/authMiddleware.js";
import { validateUserUpdate } from "../middlewares/validators/user.js";

const router = express.Router();

router.get("/", getUsers);
router.put(
  "/update/:userId",
  isAuthenticated,
  validateUserUpdate,
  isUserAuthorized,
  updateUser
);
router.delete("/delete/:userId", isAuthenticated, isUserAuthorized, deleteUser);

export default router;
