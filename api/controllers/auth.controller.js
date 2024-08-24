import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { errorHandler } from "../utils/error.js";
import { checkPassword, register } from "../repositories/auth.repository.js";
import { findUserByEmail } from "../repositories/user.repository.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Missing required fields"));
  }

  try {
    const newUser = await register(req.body);
    console.log(newUser);

    res.status(201).json("Signup successfull !");
  } catch (e) {
    next(e);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "Missing required fields"));
  }

  try {
    const validUser = await findUserByEmail(email);
    if (!validUser) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const isPasswordValid = await checkPassword(password, validUser.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, config.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (e) {
    next(e);
  }
};
