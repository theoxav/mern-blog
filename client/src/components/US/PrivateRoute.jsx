import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
  }

  return children;
};

export default PrivateRoute;
