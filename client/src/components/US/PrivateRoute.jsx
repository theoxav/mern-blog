import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
  }

  return children;
}
