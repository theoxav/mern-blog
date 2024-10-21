import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { getRandomUser } from "../services/api/randomUsers.service.js";

dotenv.config();

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("azerty10", 10);

    const users = [
      {
        username: "John",
        email: "johndoe@example.com",
        password: hashedPassword,
        isAdmin: true,
      },
    ];

    for (let i = 0; i < 7; i++) {
      const randomUser = await getRandomUser();
      if (randomUser) {
        users.push({
          username: randomUser.username,
          email: randomUser.email,
          password: hashedPassword,
          isAdmin: i < 1,
          profilePicture: randomUser.avatar,
        });
      }
    }

    await User.insertMany(users);
    console.log("Users created successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error while creating users: ${error}`);
    process.exit(1);
  }
};

createUsers();
