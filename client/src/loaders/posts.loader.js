import PostService from "../services/api/post.api";

export async function postByIdLoader({ params }) {
  const { postId } = params;

  try {
    const data = await PostService.getPostById(postId);

    return data;
  } catch (error) {
    console.error("Error fetching post: ", error);
  }
}

export async function postBySlugLoader({ params }) {
  const { postSlug } = params;

  try {
    const data = await PostService.getPostBySlug(postSlug);

    return data;
  } catch (error) {
    console.error("Error fetching post: ", error);
  }
}
