import express from "express";
import { google, signin, signup } from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validators/auth.js";

const router = express.Router();

router.post("/signup", validateRegister, signup);
router.post("/signin", validateLogin, signin);
router.post("/google", google);

export default router;
