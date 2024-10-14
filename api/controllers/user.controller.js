import UserRepository from "../repositories/user.repository.js";
import { hashPassword } from "../utils/auth.js";

export const getUsers = (req, res, next) => {
  res.json({
    message: "Api is working !",
  });
};

export const updateUser = async (req, res, next) => {
  try {
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

export const deleteUser = async (req, res, next) => {
  try {
    await UserRepository.deleteUserById(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (e) {
    next(e);
  }
};
