import { useState } from "react";
import { Button, Spinner, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../UI/InputField";

const SigninForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }
      navigate("/");
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
      </form>
      <div className="flex gap-2 text-sm mt-5">
        <span>Dont have an account?</span>
        <Link to="/sign-up" className="text-blue-500">
          Sign Up
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

export default SigninForm;
