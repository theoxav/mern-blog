import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && currentUser.isAdmin ? (
    children
  ) : (
    <Navigate to="/sign-in" />
  );
}
