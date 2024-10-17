import User from "../models/user.model.js";

class UserRepository {
  static async getUsers(queryParams) {
    try {
      const startIndex = parseInt(queryParams.startIndex, 10) || 0;
      const limit = parseInt(queryParams.limit, 10) || 9;
      const sortDirection = queryParams.order === "asc" ? 1 : -1;

      const users = await User.find()
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

      const usersWithoutPassword = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });

      const totalUsers = await User.countDocuments();

      const now = new Date();
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1);
      const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });

      return { users: usersWithoutPassword, totalUsers, lastMonthUsers };
    } catch (e) {
      throw new Error(`Error retrieving users: ${e.message}`);
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
