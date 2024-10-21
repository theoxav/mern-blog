import ApiService from "./api";

class UserService {
  static BASE_URL = "/api/users";

  static getUser(userId) {
    return ApiService.request(`${this.BASE_URL}/${userId}`);
  }

  static getUsers(startIndex = 0) {
    return ApiService.request(`${this.BASE_URL}?startIndex=${startIndex}`);
  }

  static deleteUser(userId) {
    return ApiService.request(`${this.BASE_URL}/delete/${userId}`, "DELETE");
  }
}

export default UserService;
