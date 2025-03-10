import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentService from "../../services/api/comment.api";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import UIModal from "../UI/Modal/Modal";

export default function CommentSection({ postId }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null); // Stocke l'ID du commentaire sélectionné pour suppression

  const handleSubmit = async () => {
    setCommentError(null);
    if (comment.length > 200) return;
    try {
      const data = await CommentService.create({
        content: comment,
        postId,
        userId: currentUser._id,
      });
      setComment("");
      setComments([data, ...comments]);
    } catch (e) {
      setCommentError(e.message);
      console.error("Failed to create comment: ", e);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await CommentService.getPostComments(postId);
        setComments(data);
      } catch (e) {
        console.error("Failed to get comments: ", e);
      }
    };

    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const data = await CommentService.likeComment(commentId);
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
            : comment
        )
      );
    } catch (e) {
      console.error("Failed to like comment: ", e);
    }
  };

  const handleEdit = (comment, editedContent) => {
    try {
      setComments(
        comments.map((c) =>
          c._id === comment._id ? { ...c, content: editedContent } : c
        )
      );
    } catch (e) {
      console.error("Failed to edit comment: ", e);
    }
  };

  const handleDelete = async () => {
    try {
      await CommentService.deleteComment(selectedCommentId);
      setComments(
        comments.filter((comment) => comment._id !== selectedCommentId)
      );
      setShowModal(false);
    } catch (e) {
      console.error("Failed to delete comment: ", e);
    }
  };

  const handleOpenDeleteModal = (commentId) => {
    setSelectedCommentId(commentId);
    setShowModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Sign in as:</p>
          <img
            className="h5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <CommentForm
          onSubmit={handleSubmit}
          comment={comment}
          setComment={setComment}
          commentError={commentError}
        />
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={() => handleOpenDeleteModal(comment._id)}
            />
          ))}
        </>
      )}

      <UIModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalQuestion={`Are you sure you want to delete this comment?`}
        handleConfirmModal={handleDelete}
      />
    </div>
  );
}
