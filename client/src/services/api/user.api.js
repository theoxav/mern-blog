import ApiService from "./api";

class UserService {
  static getUsers(startIndex = 0) {
    return ApiService.request(`/api/users?startIndex=${startIndex}`);
  }

  static deleteUser(userId) {
    return ApiService.request(`/api/users/delete/${userId}`, "DELETE");
  }
}

export default UserService;
