import { useState } from "react";
import { Button, Spinner, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../UI/Inputs/InputField";
import OAuth from "./components/OAuth";
import AuthService from "../../services/api/auth.api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputField
          id="username"
          type="text"
          placeholder="Username"
          label="Your username"
          onChange={handleChange}
        />
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
          placeholder="password"
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
