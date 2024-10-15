import mongoose from "mongoose";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const createPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Post.deleteMany();

    const adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      console.error("Admin user not found. Please seed users first.");
      process.exit(1);
    }

    const categories = ["Javascript", "React.js", "Next.js"];

    const posts = Array.from({ length: 20 }, (_, i) => ({
      title: `Post ${i + 1}`,
      content: `This is the content for post ${i + 1}.`,
      image: `https://cdn.pixabay.com/photo/2016/08/23/10/16/program-1613990_1280.png`,
      category: categories[i % categories.length],
      slug: `post-${i + 1}`,
      userId: adminUser._id.toString(),
    }));

    await Post.insertMany(posts);
    console.log("Posts created successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error while creating posts: ${error}`);
    process.exit(1);
  }
};

createPosts();
