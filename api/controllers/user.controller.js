import UserRepository from "../repositories/user.repository.js";
import { hashPassword } from "../utils/auth.js";
import { errorHandler } from "../utils/error.js";

export const getUsers = (req, res, next) => {
  res.json({
    message: "Api is working !",
  });
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "You are not allowed to update this user"));
    }

    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

    const updatedUser = await UserRepository.updateUserById(
      req.params.userId,
      req.body
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    next(e);
  }
};
