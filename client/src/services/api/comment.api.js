import ApiService from "./api";

class CommentService {
  static getAll(postId) {
    return ApiService.request(`/api/comments/${postId}`);
  }

  static create(formData) {
    return ApiService.request("/api/comments/create", "POST", formData);
  }
}

export default CommentService;
