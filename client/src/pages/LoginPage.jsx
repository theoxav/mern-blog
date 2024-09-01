import Login from "../components/Auth/Login";
import AuthLayout from "../components/Layout/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout title="This is a demo project. You can sign in with your email and password or with Google.">
      <Login />
    </AuthLayout>
  );
}
