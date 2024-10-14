import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return currentUser ? children : <Navigate to="/sign-in" />;
}
