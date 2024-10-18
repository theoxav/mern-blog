import { useLoaderData } from "react-router-dom";
import PostDetail from "../../components/Posts/PostDetail";
import NotFoundPage from "../not-found/NotFoundPage";

export default function PostPage() {
  const post = useLoaderData();

  return <div>{post ? <PostDetail post={post} /> : <NotFoundPage />}</div>;
}
