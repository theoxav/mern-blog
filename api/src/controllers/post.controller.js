import PostRepository from "../repositories/post.repository.js";

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = isNaN(parseInt(req.query.startIndex))
      ? 0
      : parseInt(req.query.startIndex);
    const limit = isNaN(parseInt(req.query.limit))
      ? 9
      : parseInt(req.query.limit);
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const { posts, totalPosts, lastMonthPosts } = await PostRepository.getAll(
      req.query,
      startIndex,
      limit,
      sortDirection
    );

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (e) {
    next(e);
  }
};

export const createPost = async (req, res, next) => {
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

export const getPostById = async (req, res, next) => {
  try {
    const post = await PostRepository.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    next(e);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await PostRepository.getPostBySlug(req.params.slug);
    res.status(200).json(post);
  } catch (e) {
    next(e);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await PostRepository.updatePostById(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedPost);
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    await PostRepository.deletePostById(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (e) {
    next(e);
  }
};
