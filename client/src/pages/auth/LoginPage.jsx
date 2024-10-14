import { Navigate } from "react-router-dom";
import Login from "../../components/Auth/Login";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useIsAlreadyLogin } from "../../hooks/auth/useIsAlreadyLogin";

export default function LoginPage() {
  const isAlreadyLoggedIn = useIsAlreadyLogin();

  if (isAlreadyLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthLayout title="This is a demo project. You can sign in with your email and password or with Google.">
      <Login />
    </AuthLayout>
  );
}
