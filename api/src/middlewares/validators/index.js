import { validationResult } from "express-validator";
import { errorHandler } from "../../utils/error.js";

export const validate = async (req, res, next, validationRules) => {
  for (const rule of validationRules) {
    await rule.run(req);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(errorHandler(400, errors.array()[0].msg));
  }

  next();
};
