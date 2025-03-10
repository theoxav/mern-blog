import Post from "../models/post.model.js";

class PostRepository {
  static async getAll(queryParams, startIndex, limit, sortDirection) {
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
  }

  static async getPostById(postId) {
    return Post.findById(postId);
  }

  static async getPostBySlug(slug) {
    return Post.findOne({ slug });
  }

  static async create(postData) {
    const newPost = new Post({
      title: postData.title,
      content: postData.content,
      slug: postData.slug,
      image: postData.image,
      category: postData.category,
      userId: postData.userId,
    });
    return newPost.save();
  }

  static async updatePostById(postId, postData) {
    return Post.findByIdAndUpdate(postId, postData, { new: true });
  }

  static async deletePostById(postId) {
    return Post.findByIdAndDelete(postId);
  }
}

export default PostRepository;
