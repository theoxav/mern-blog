import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return currentUser.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
  }

  return children;
};

export default AdminRoute;
