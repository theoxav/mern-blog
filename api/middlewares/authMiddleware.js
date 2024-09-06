import { errorHandler } from "../utils/error.js";
import { getToken, verifyToken } from "../utils/token.js";

export const isAuthenticated = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  const user = verifyToken(token);

  if (!user) {
    return next(errorHandler(401, "Unauthorized"));
  }

  req.user = user;
  next();
};
