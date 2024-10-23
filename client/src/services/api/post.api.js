import ApiService from "./api";

class PostService {
  static BASE_URL = "/api/posts";

  static getPosts(params = {}) {
    const urlParams = new URLSearchParams();

    if (params.userId) {
      urlParams.append("userId", params.userId);
    }
    if (params.startIndex) {
      urlParams.append("startIndex", params.startIndex);
    }
    if (params.limit) {
      urlParams.append("limit", params.limit);
    }

    if (params.searchTerm) {
      urlParams.append("searchTerm", params.searchTerm);
    }

    if (params.sort) {
      urlParams.append("sort", params.sort);
    }

    if (params.category) {
      urlParams.append("category", params.category);
    }

    return ApiService.request(`${this.BASE_URL}?${urlParams.toString()}`);
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
