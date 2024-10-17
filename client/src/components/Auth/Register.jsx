import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Spinner, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../UI/Inputs/InputField";
import OAuth from "./components/OAuth";
import AuthService from "../../services/api/auth.api";
import { useState } from "react";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await AuthService.register(formData);
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="username"
          type="text"
          placeholder="Username"
          label="Your username"
          {...register("username")}
          error={errors.username?.message}
        />
        <InputField
          id="email"
          type="email"
          placeholder="name@company.com"
          label="Your email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          id="password"
          type="password"
          placeholder="password"
          label="Your password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <OAuth />
      </form>

      <div className="flex gap-2 text-sm mt-5">
        <span>Have an account?</span>
        <Link to="/sign-in" className="text-blue-500">
          Sign In
        </Link>
      </div>

      {errorMessage && (
        <Alert className="mt-5" color="failure">
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default Register;
