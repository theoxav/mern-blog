import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
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
}
