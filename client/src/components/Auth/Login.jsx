import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import InputField from "../UI/Inputs/InputField";
import OAuth from "./components/OAuth";
import AuthService from "../../services/api/auth.api";

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(signInStart());
      const response = await AuthService.signin(data);
      dispatch(signInSuccess(response));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="**********"
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
            "Sign In"
          )}
        </Button>
        <OAuth />
      </form>

      <div className="flex gap-2 text-sm mt-5">
        <span>Don't have an account?</span>
        <Link to="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </div>

      {errorMessage && <ErrorAlert message={errorMessage} />}
    </>
  );
};

export default Login;
