import { body } from "express-validator";
import { validate } from "./index.js"; // Assurez-vous que le chemin est correct

export const validateUserUpdate = async (req, res, next) => {
  const validationRules = [
    body("username")
      .optional()
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters long")
      .matches(/^\S*$/)
      .withMessage("Username cannot contain spaces")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Username must contain only letters and numbers"),

    body("email").optional().isEmail().withMessage("Invalid email address"),

    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];

  await validate(req, res, next, validationRules);
};
