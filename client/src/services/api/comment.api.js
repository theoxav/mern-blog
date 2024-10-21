import ApiService from "./api";

class CommentService {
  static BASE_URL = "/api/comments";

  static getAll(postId) {
    return ApiService.request(`${this.BASE_URL}/${postId}`);
  }

  static create(formData) {
    return ApiService.request(`${this.BASE_URL}/create`, "POST", formData);
  }

  static editComment(commentId, formData) {
    return ApiService.request(
      `${this.BASE_URL}/editComment/${commentId}`,
      "PUT",
      formData
    );
  }

  static likeComment(commentId) {
    return ApiService.request(
      `${this.BASE_URL}/likeComment/${commentId}`,
      "PUT"
    );
  }
}

export default CommentService;
