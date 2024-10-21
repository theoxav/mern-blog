import CommentRepository from "../repositories/comment.repository.js";

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await CommentRepository.getPostComments(req.params.postId);

    res.status(200).json(comments);
  } catch (e) {
    next(e);
  }
};
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(errorHandler(403, "You are not authorized"));
    }
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
