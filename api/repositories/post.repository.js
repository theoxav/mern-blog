import Post from "../models/post.model.js";

class PostRepository {
  static async getAll(queryParams, startIndex, limit, sortDirection) {
    try {
      const { userId, category, slug, postId, searchTerm } = queryParams;

      const query = {
        ...(userId && { userId }),
        ...(category && { category }),
        ...(slug && { slug }),
        ...(postId && { _id: postId }),
        ...(searchTerm && {
          $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { content: { $regex: searchTerm, $options: "i" } },
          ],
        }),
      };

      const posts = await Post.find(query)
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

      const totalPosts = await Post.countDocuments(query);

      const now = new Date();
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1);

      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });

      return { posts, totalPosts, lastMonthPosts };
    } catch (e) {
      throw e;
    }
  }

  static async getPostById(postId) {
    try {
      const post = await Post.findById(postId);
      return post;
    } catch (e) {
      throw e;
    }
  }

  static async getPostBySlug(slug) {
    try {
      const post = await Post.findOne({ slug });
      return post;
    } catch (e) {
      throw e;
    }
  }

  static async create(postData) {
    try {
      const newPost = new Post({
        title: postData.title,
        content: postData.content,
        slug: postData.slug,
        image: postData.image,
        category: postData.category,
        userId: postData.userId,
      });

      return await newPost.save();
    } catch (e) {
      throw e;
    }
  }

  static async updatePostById(postId, postData) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
        new: true,
      });
      return updatedPost;
    } catch (e) {
      throw e;
    }
  }

  static async deletePostById(postId) {
    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      return deletedPost;
    } catch (e) {
      throw e;
    }
  }
}

export default PostRepository;
