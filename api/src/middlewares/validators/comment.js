import { body } from "express-validator";
import { validate } from "./index.js";

export const validateCreateComment = async (req, res, next) => {
  const validationRules = [
    body("content").notEmpty().withMessage("Content is required"),
  ];

  await validate(req, res, next, validationRules);
};
