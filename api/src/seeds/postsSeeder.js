import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
import posts from '../data/posts.js';

dotenv.config();

const createPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Post.deleteMany();

    const adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      console.error('Admin user not found. Please seed users first.');
      process.exit(1);
    }

    const postData = posts(adminUser._id.toString());

    await Post.insertMany(postData);
    console.log('Posts created successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error while creating posts: ${error}`);
    process.exit(1);
  }
};

createPosts();
