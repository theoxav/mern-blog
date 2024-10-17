import axios from "axios";

export const getRandomUser = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];
    return {
      username: user.login.username,
      email: user.email,
      avatar: user.picture.large,
    };
  } catch (error) {
    console.error("Error fetching random user:", error);
    throw error;
  }
};
