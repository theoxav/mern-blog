class PostService {
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

  static async getPostById(postId) {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch post");
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.error("Error fetching post: ", error);
      throw new Error(`${error.message}`);
    }
  }

  static async getPostBySlug(postSlug) {
    try {
      const res = await fetch(`/api/posts/slug/${postSlug}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch post");
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.error("Error fetching post: ", error);
      throw new Error(`${error.message}`);
    }
  }

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

  static async update(postId, formData) {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update post");
      }

      return data;
    } catch (error) {
      console.error("Post update error: ", error);
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
