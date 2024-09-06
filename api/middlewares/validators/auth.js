import { body } from "express-validator";
import { validate } from "./index.js"; // Assurez-vous que le chemin est correct

export const validateRegister = async (req, res, next) => {
  const validationRules = [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters long")
      .matches(/^\S*$/)
      .withMessage("Username cannot contain spaces")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        "Username must contain only letters, numbers, and underscores"
      ),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];

  await validate(req, res, next, validationRules);
};

export const validateLogin = async (req, res, next) => {
  const validationRules = [
    body("email").notEmpty().withMessage("Email is required").isEmail(),

    body("password").notEmpty().withMessage("Password is required"),
  ];

  await validate(req, res, next, validationRules);
};
