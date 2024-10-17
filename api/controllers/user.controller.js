import UserRepository from "../repositories/user.repository.js";
import { hashPassword } from "../utils/auth.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserRepository.getUsers(req.query);
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
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
