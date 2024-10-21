import Comment from "../models/comment.model.js";

class CommentRepository {
  static async getPostComments(postId) {
    return Comment.find({ postId }).sort({ createdAt: -1 });
  }

  static async getCommentById(commentId) {
    return Comment.findById(commentId);
  }

  static async create({ content, postId, userId }) {
    const comment = new Comment({ content, postId, userId });
    return comment.save();
  }
}

export default CommentRepository;
