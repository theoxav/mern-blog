import ApiService from "./api";

class AuthService {
  static BASE_URL = "/api/auth";

  static register(formData) {
    return ApiService.request(`${this.BASE_URL}/signup`, "POST", formData);
  }

  static signin(formData) {
    return ApiService.request(`${this.BASE_URL}/signin`, "POST", formData);
  }

  static logout() {
    return ApiService.request(`${this.BASE_URL}/signout`, "POST");
  }

  static deleteAccount(userId) {
    return ApiService.request(
      `${this.BASE_URL}/delete-account/${userId}`,
      "DELETE"
    );
  }
}

export default AuthService;
