import Post from "../models/post.model.js";

class PostRepository {
  static async create(postData) {
    try {
      const newPost = new Post({
        title: postData.title,
        content: postData.content,
        slug: postData.slug,
        image: postData.image,
        category: postData.category,
      });

      return await newPost.save();
    } catch (e) {
      throw e;
    }
  }
}

export default PostRepository;
