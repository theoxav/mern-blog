import CallToAction from "../components/US/CallToAction";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col justify-center items-center gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">
        Build fun and engaging projects while learning HTML, CSS, and
        Javascript!
      </p>
      <CallToAction />
    </div>
  );
}
