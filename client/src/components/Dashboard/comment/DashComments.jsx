import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import UIModal from "../../UI/Modal/Modal";
import CommentService from "../../../services/api/comment.api";

export default function DashComments() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/dashboard?tab=profile");
      return;
    }

    const fetchComments = async () => {
      try {
        const data = await CommentService.getComments({
          sortDirection: "desc",
        });

        setComments(data.comments);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch comments: ", error);
      }
    };

    fetchComments();
  }, [currentUser, navigate]);

  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const data = await CommentService.getComments({
        startIndex: startIndex,
      });

      setComments((prevComments) => [...prevComments, ...data.comments]);

      if (data.comments.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch comments: ", error);
    }
  };

  const handleDeleteComments = async () => {
    setShowModal(false);
    try {
      await CommentService.deleteComment(commentIdToDelete);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentIdToDelete)
      );
    } catch (error) {
      console.error("Failed to delete comment: ", error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>DATE UPDATED</Table.HeadCell>
              <Table.HeadCell>COMMENT CONTENT</Table.HeadCell>
              <Table.HeadCell>NUMBER OF LIKES</Table.HeadCell>
              <Table.HeadCell>POSTID</Table.HeadCell>
              <Table.HeadCell>USERID</Table.HeadCell>
              <Table.HeadCell>DELETE</Table.HeadCell>
            </Table.Head>
            {comments.map((comment, index) => (
              <Table.Body key={`${comment._id}-${index}`} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      className=" font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                    >
                      Delete
                    </span>
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
        <p>No comments yet</p>
      )}
      <UIModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalQuestion={`Are you sure you want to delete this comment?`}
        handleConfirmModal={handleDeleteComments}
      />
    </div>
  );
}
