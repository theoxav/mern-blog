import User from "../models/user.model.js";

class UserRepository {
  static async getUsers(queryParams) {
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
  }

  static async findUserById(userId) {
    return User.findById(userId);
  }

  static async findUserByEmail(email) {
    return User.findOne({ email });
  }

  static async register(userData) {
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });

    return newUser.save();
  }

  static async updateUserById(userId, updateData) {
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
  }

  static async deleteUserById(userId) {
    return User.findByIdAndDelete(userId);
  }
}

export default UserRepository;
