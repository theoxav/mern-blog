import { useParams } from "react-router-dom";

export default function PostDetail({ post }) {
  const { postSlug } = useParams();

  return <div>The post detail </div>;
}
