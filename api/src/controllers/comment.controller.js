import CommentRepository from "../repositories/comment.repository.js";
import { errorHandler } from "../utils/error.js";

export const getComments = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;

    const { comments, totalComments, lastMonthComments } =
      await CommentRepository.getComments(startIndex, limit, sortDirection);

    res.status(200).json({
      comments,
      totalComments,
      lastMonthComments,
    });
  } catch (e) {
    next(e);
  }
};
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

export const editComment = async (req, res, next) => {
  try {
    const comment = await CommentRepository.getCommentById(
      req.params.commentId
    );
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, "You are not authorized"));
    }
    const updatedComment = await CommentRepository.updateCommentById(
      req.params.commentId,
      req.body.content
    );
    return res.status(200).json(updatedComment);
  } catch (e) {
    next(e);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await CommentRepository.getCommentById(
      req.params.commentId
    );
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, "You are not authorized"));
    }
    await CommentRepository.deleteCommentById(req.params.commentId);
    return res.status(200).json("Comment has been deleted");
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
