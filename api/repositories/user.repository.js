import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (e) {
    throw e;
  }
};
