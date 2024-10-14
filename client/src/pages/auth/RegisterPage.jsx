import { Navigate } from "react-router-dom";
import Register from "../../components/Auth/Register";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useIsAlreadyLogin } from "../../hooks/auth/useIsAlreadyLogin";

export default function Signup() {
  const isAlreadyLoggedIn = useIsAlreadyLogin();

  if (isAlreadyLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthLayout title="This is a demo project. You can sign up with your email and password or with Google.">
      <Register />
    </AuthLayout>
  );
}
