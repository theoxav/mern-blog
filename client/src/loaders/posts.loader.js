import PostService from "../services/api/post/post.api";

export async function postByIdLoader({ params }) {
  const { postId } = params;

  try {
    const data = await PostService.getPostById(postId);

    return data;
  } catch (error) {
    console.error("Error fetching post: ", error);
  }
}
