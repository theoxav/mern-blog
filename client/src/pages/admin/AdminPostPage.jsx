import { useLoaderData, useLocation } from "react-router-dom";
import PostForm from "../../components/Admin/form/PostForm";

export default function AdminPostPage() {
  const location = useLocation();
  const post = useLoaderData();

  const isEditingMode = location.pathname.includes("update-post");
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        {isEditingMode ? "Update" : "Create"} Post
      </h1>
      <PostForm post={post} />
    </div>
  );
}
