import Comment from "../models/comment.model.js";

class CommentRepository {
  static async getComments(startIndex, limit, sortDirection) {
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1);

    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return { comments, totalComments, lastMonthComments };
  }

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

  static async updateCommentById(commentId, content) {
    return Comment.findByIdAndUpdate(commentId, { content }, { new: true });
  }

  static async deleteCommentById(commentId) {
    return Comment.findByIdAndDelete(commentId);
  }
}

export default CommentRepository;
