import { createUser } from "../repositories/user.repository.js";
import { errorHandler } from "../utils/error.js";

export const getUsers = (req, res, next) => {
  res.json({
    message: "Api is working !",
  });
};

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
    const newUser = await createUser(req.body);
    console.log(newUser);

    res.status(201).json("Signup successfull !");
  } catch (e) {
    next(e);
  }
};
