class PostService {
  static async create(formData) {
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      return data;
    } catch (error) {
      console.error("Post creation error: ", error);
      throw new Error(`${error.message}`);
    }
  }

  static async getPosts(userId, startIndex = 0) {
    try {
      const res = await fetch(
        `/api/posts?userId=${userId}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }

      return data;
    } catch (error) {
      console.error("Error fetching posts: ", error);
      throw new Error(`${error.message}`);
    }
  }

  static async deletePost(postId) {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete post");
      }

      return data;
    } catch (error) {
      console.error("Error deleting post: ", error);
      throw new Error(`${error.message}`);
    }
  }
}

export default PostService;
