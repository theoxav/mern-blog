import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentService from "../../services/api/comment.api";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
export default function CommentSection({ postId }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);

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
        const data = await CommentService.getAll(postId);

        setComments(data);
      } catch (e) {
        console.error("Failed to get comments: ", e);
      }
    };

    getComments();
  }, [postId]);

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
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
}
