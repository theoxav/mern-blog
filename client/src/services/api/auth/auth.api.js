// services/AuthService.js
class AuthService {
  static async logout() {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to log out");
      }

      return res.json();
    } catch (error) {
      console.error("Logout error: ", error);
      throw new Error(`Logout failed: ${error.message}`);
    }
  }
}

export default AuthService;
