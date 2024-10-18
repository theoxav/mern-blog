import express from "express";
import {
  deleteAccount,
  google,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validators/auth.js";
import {
  isAuthenticated,
  isUserAuthorized,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", validateRegister, signup);
router.post("/signin", validateLogin, signin);
router.post("/signout", signout);
router.post("/google", google);
router.delete(
  "/delete-account/:userId",
  isAuthenticated,
  isUserAuthorized,
  deleteAccount
);

export default router;
