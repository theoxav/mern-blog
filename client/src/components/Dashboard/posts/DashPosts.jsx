import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PostService from "../../../services/api/post.api";
import { Table } from "flowbite-react";
import UIModal from "../../UI/Modal/Modal";

export default function DashPosts() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/dashboard?tab=profile");
      return;
    }

    const fetchPosts = async () => {
      try {
        const data = await PostService.getPosts({ userId: currentUser._id });
        setUserPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch posts: ", error);
      }
    };

    fetchPosts();
  }, [currentUser, navigate]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const data = await PostService.getPosts(currentUser._id, startIndex);

      setUserPosts((prevPosts) => [...prevPosts, ...data.posts]);

      if (data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch posts: ", error);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      await PostService.deletePost(postId);
      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Failed to delete post: ", error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post, index) => (
              <Table.Body key={`${post._id}-${index}`} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      className=" font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setPostId(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>No posts yet</p>
      )}
      <UIModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalQuestion={`Are you sure you want to delete this post?`}
        handleConfirmModal={handleDeletePost}
      />
    </div>
  );
}
