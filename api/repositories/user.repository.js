import User from "../models/user.model.js";

class UserRepository {
  static async register(userData) {
    try {
      const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: userData.password,
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

  static async updateUserById(userId, updateData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            username: updateData.username,
            email: updateData.email,
            profilePicture: updateData.profilePicture,
            password: updateData.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;

      return rest;
    } catch (e) {
      throw e;
    }
  }

  static async deleteUserById(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (e) {
      throw e;
    }
  }
}

export default UserRepository;
