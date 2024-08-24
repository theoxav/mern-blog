import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const createUser = async (user) => {
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
