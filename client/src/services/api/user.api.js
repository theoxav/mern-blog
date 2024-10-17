class UserService {
  static async getUsers(startIndex = 0) {
    try {
      const res = await fetch(`/api/users?startIndex=${startIndex}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      return data;
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw new Error(`${error.message}`);
    }
  }

  static async deleteUser(userId) {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      return data;
    } catch (error) {
      console.error("Error deleting user: ", error);
      throw new Error(`${error.message}`);
    }
  }
}

export default UserService;
