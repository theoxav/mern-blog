import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentForm from "../forms/CommentForm/CommentForm";
export default function CommentSection({ postId }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = (comment) => {
    console.log(comment);
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
      {currentUser && <CommentForm onSubmit={handleSubmit} />}
    </div>
  );
}
