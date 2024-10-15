import PostRepository from "../repositories/post.repository.js";

export const createPost = async (req, res, next) => {
  console.log("in the controller");

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = {
    ...req.body,
    slug,
    userId: req.user.id,
  };

  try {
    const post = await PostRepository.create(newPost);
    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
};
