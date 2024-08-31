import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
  const { password, ...rest } = user._doc;
  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .json(rest);
};
