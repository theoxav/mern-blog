import { Alert } from "flowbite-react";

const ErrorAlert = ({ message }) =>
  message && (
    <Alert className="mt-5" color="failure">
      {message}
    </Alert>
  );

export default ErrorAlert;
