import { Spinner } from "flowbite-react";

const Loading = () => (
  <div className="mx-auto">
    <div className="text-center">
      <Spinner
        color="purple"
        aria-label="Center-aligned spinner example"
        size="xl"
      />
    </div>
  </div>
);

export default Loading;
