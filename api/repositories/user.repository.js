import User from "../models/user.model.js";
import { hashPassword } from "../utils/auth.js";

class UserRepository {
  static async register(userData) {
    try {
      const hashedPassword = await hashPassword(userData.password, 10);

      const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (e) {
      throw e;
    }
  }

  static async findUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (e) {
      throw e;
    }
  }
}

export default UserRepository;
