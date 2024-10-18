import ApiService from "./api";

class PostService {
  static getPosts(userId, startIndex = 0) {
    return ApiService.request(
      `/api/posts?userId=${userId}&startIndex=${startIndex}`
    );
  }

  static getPostById(postId) {
    return ApiService.request(`/api/posts/${postId}`);
  }

  static getPostBySlug(postSlug) {
    return ApiService.request(`/api/posts/slug/${postSlug}`);
  }

  static create(formData) {
    return ApiService.request("/api/posts/create", "POST", formData);
  }

  static update(postId, formData) {
    return ApiService.request(`/api/posts/${postId}`, "PUT", formData);
  }

  static deletePost(postId) {
    return ApiService.request(`/api/posts/${postId}`, "DELETE");
  }
}

export default PostService;
