import Comment from "../models/comment.model.js";

class CommentRepository {
  static async create({ content, postId, userId }) {
    try {
      const newComment = new Comment({
        content,
        postId,
        userId,
      });
      return await newComment.save();
    } catch (e) {
      throw e;
    }
  }
}

export default CommentRepository;
