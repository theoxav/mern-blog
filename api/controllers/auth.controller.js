import { errorHandler } from "../utils/error.js";
import UserRepository from "../repositories/user.repository.js";
import { generateToken } from "../utils/token.js";
import { checkPassword, hashPassword } from "../utils/auth.js";

export const signup = async (req, res, next) => {
  try {
    const existingUser = await UserRepository.findUserByEmail(req.body.email);
    if (existingUser) {
      return next(errorHandler(409, "User already exists"));
    }
    const hashedPassword = await hashPassword(req.body.password, 10);

    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    const newUser = await UserRepository.register(userData);

    return res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await UserRepository.findUserByEmail(email);
    if (!validUser) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const isPasswordValid = await checkPassword(password, validUser.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    generateToken(validUser, res);
  } catch (e) {
    next(e);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("You are logged out successfully");
  } catch (e) {
    next(e);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await UserRepository.findUserByEmail(email);
    if (user) {
      generateToken(user, res);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await hashPassword(generatedPassword);

      const newUser = await UserRepository.register({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      generateToken(newUser, res);
    }
  } catch (e) {
    next(e);
  }
};
