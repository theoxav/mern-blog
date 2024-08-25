import SigninForm from "../components/Forms/SigninForm";
import AuthLayout from "../components/Layout/AuthLayout";

export default function Signin() {
  return (
    <AuthLayout title="This is a demo project. You can sign in with your email and password or with Google.">
      <SigninForm />
    </AuthLayout>
  );
}
