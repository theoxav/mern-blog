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
}

export default PostService;
