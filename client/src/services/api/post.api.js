import ApiService from "./api";

class PostService {
  static BASE_URL = "/api/posts";

  static getPosts(userId, startIndex = 0) {
    return ApiService.request(
      `${this.BASE_URL}?userId=${userId}&startIndex=${startIndex}`
    );
  }

  static getPostById(postId) {
    return ApiService.request(`${this.BASE_URL}/${postId}`);
  }

  static getPostBySlug(postSlug) {
    return ApiService.request(`${this.BASE_URL}/slug/${postSlug}`);
  }

  static create(formData) {
    return ApiService.request(`${this.BASE_URL}/create`, "POST", formData);
  }

  static update(postId, formData) {
    return ApiService.request(`${this.BASE_URL}/${postId}`, "PUT", formData);
  }

  static deletePost(postId) {
    return ApiService.request(`${this.BASE_URL}/${postId}`, "DELETE");
  }
}

export default PostService;
