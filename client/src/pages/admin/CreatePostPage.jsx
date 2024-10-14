import CreatePostForm from "../../components/Admin/form/CreatePostForm";

export default function CreatePostPage() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <CreatePostForm />
    </div>
  );
}
