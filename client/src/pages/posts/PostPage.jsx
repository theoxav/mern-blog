import { useLoaderData } from "react-router-dom";
import PostDetail from "../../components/Posts/PostDetail";

export default function PostPage() {
  const post = useLoaderData();

  return (
    <div>
      <PostDetail post={post} />
    </div>
  );
}
