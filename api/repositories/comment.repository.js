import Comment from "../models/comment.model.js";

class CommentRepository {
  static async create({ content, postId, userId }) {
    const comment = new Comment({ content, postId, userId });
    return comment.save();
  }
}

export default CommentRepository;
