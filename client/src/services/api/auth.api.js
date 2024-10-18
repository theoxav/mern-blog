import ApiService from "./api";

class AuthService {
  static register(formData) {
    return ApiService.request("/api/auth/signup", "POST", formData);
  }

  static signin(formData) {
    return ApiService.request("/api/auth/signin", "POST", formData);
  }

  static logout() {
    return ApiService.request("/api/auth/signout", "POST");
  }

  static deleteAccount(userId) {
    return ApiService.request(`/api/auth/delete-account/${userId}`, "DELETE");
  }
}

export default AuthService;
