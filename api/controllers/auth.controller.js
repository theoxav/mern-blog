import { errorHandler } from "../utils/error.js";
import UserRepository from "../repositories/user.repository.js";
import { generateToken } from "../utils/token.js";
import { checkPassword, hashPassword } from "../utils/auth.js";

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
    const newUser = await UserRepository.register(req.body);

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
