import { Spinner } from "flowbite-react";

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
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
