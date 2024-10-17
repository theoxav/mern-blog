import { useDispatch } from "react-redux";
import AuthService from "../../services/api/auth.api";
import { signoutFailure, signoutSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await AuthService.logout();
      dispatch(signoutSuccess());
      navigate("/sign-in");
    } catch (error) {
      console.error("Error during sign out:", error);
      dispatch(signoutFailure(error.message));
    }
  };

  return { handleSignout };
};
