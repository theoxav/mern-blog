import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import ErrorAlert from "../UI/Alert/ErrorAlert";
import InputField from "../UI/Inputs/InputField";
import OAuth from "./components/OAuth";
import AuthService from "../../services/api/auth/auth.api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill in all fields"));
      return;
    }

    try {
      dispatch(signInStart());
      const data = await AuthService.signin(formData);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputField
          id="email"
          type="email"
          placeholder="name@company.com"
          label="Your email"
          onChange={handleChange}
        />
        <InputField
          id="password"
          type="password"
          placeholder="**********"
          label="Your password"
          onChange={handleChange}
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
        <span>Dont have an account?</span>
        <Link to="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </div>
      {errorMessage && <ErrorAlert message={errorMessage} />}
    </>
  );
};

export default Login;
