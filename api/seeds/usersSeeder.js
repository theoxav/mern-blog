import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.model.js";
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
      {
        username: "Jane",
        email: "janedoe@example.com",
        password: hashedPassword,
        isAdmin: false,
      },
    ];

    await User.insertMany(users);
    console.log("Users created successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error while creating users: ${error}`);
    process.exit(1);
  }
};

createUsers();
