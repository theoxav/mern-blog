import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    config.JWT_SECRET
  );
  const { password, ...rest } = user._doc;
  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .json(rest);
};

export const getToken = (req) => {
  return req.cookies.access_token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return false;
    return user;
  });
};
