import CommentRepository from "../repositories/comment.repository.js";
import { errorHandler } from "../utils/error.js";

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

export const likeComment = async (req, res, next) => {
  try {
    const comment = await CommentRepository.getCommentById(
      req.params.commentId
    );
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.likes.push(req.user.id);
      comment.numberOfLikes += 1;
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();

    return res.status(200).json(comment);
  } catch (e) {
    next(e);
  }
};
