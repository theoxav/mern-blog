import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function DashPosts() {
  const currentUser = useSelector((state) => state.user.currentUser);
  if (!currentUser.isAdmin) {
    return <Navigate to="/dashboard?tab=profile" />;
  }

  return <div>DashPosts</div>;
}
