import ApiService from "./api";

class CommentService {
  static create(formData) {
    return ApiService.request("/api/comments/create", "POST", formData);
  }
}

export default CommentService;
