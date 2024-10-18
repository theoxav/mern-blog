import CommentRepository from "../repositories/comment.repository.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    const newComment = await CommentRepository.create({
      content,
      postId,
      userId,
    });

    return res.status(201).json(newComment);
  } catch (e) {
    next(e);
  }
};
