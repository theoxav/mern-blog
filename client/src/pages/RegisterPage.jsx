import Register from "../components/Auth/Register";
import AuthLayout from "../components/Layout/AuthLayout";

export default function Signup() {
  return (
    <AuthLayout title="This is a demo project. You can sign up with your email and password or with Google.">
      <Register />
    </AuthLayout>
  );
}
