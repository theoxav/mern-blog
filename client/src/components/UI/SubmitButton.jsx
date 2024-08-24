import { Button, Spinner } from "flowbite-react";

const SubmitButton = ({ loading, text }) => (
  <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
    {loading ? (
      <>
        <Spinner size="sm" />
        <span className="pl-3">Loading...</span>
      </>
    ) : (
      text
    )}
  </Button>
);

export default SubmitButton;
