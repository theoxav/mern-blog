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

      return res.json(); // Renvoie directement les données JSON
    } catch (error) {
      console.error("Logout error: ", error);
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  static async signin(formData) {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      return data;
    } catch (error) {
      console.error("Signin error: ", error);
      throw new Error(`Signin failed: ${error.message}`);
    }
  }
}

export default AuthService;
