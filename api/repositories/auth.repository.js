import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async (user) => {
  try {
    const hashedPassword = await bcryptjs.hash(user.password, 10);
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    return newUser.save();
  } catch (e) {
    throw e;
  }
};

export const checkPassword = async (password, userPassword) => {
  try {
    const isPasswordValid = await bcryptjs.compareSync(password, userPassword);
    return isPasswordValid;
  } catch (e) {
    throw e;
  }
};
