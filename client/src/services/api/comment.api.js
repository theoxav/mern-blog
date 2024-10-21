import ApiService from "./api";

class CommentService {
  static BASE_URL = "/api/comments";

  static getComments(params = {}) {
    const urlParams = new URLSearchParams();

    if (params.startIndex) {
      urlParams.append("startIndex", params.startIndex);
    }
    if (params.limit) {
      urlParams.append("limit", params.limit);
    }

    if (params.sortDirection) {
      urlParams.append("sortDirection", params.sortDirection);
    }

    return ApiService.request(`${this.BASE_URL}?${urlParams.toString()}`);
  }

  static getPostComments(postId) {
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

  static deleteComment(commentId) {
    return ApiService.request(
      `${this.BASE_URL}/deleteComment/${commentId}`,
      "DELETE"
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
