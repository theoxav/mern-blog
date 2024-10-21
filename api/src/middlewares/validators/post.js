import { body } from "express-validator";
import { validate } from "./index.js";

export const validateCreatePost = async (req, res, next) => {
  const validationRules = [
    body("title").notEmpty().withMessage("Title is required"),

    body("content").notEmpty().withMessage("Content is required"),
  ];

  await validate(req, res, next, validationRules);
};
