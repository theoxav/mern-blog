import { Alert, Button, Textarea } from "flowbite-react";

export default function CommentForm({
  onSubmit,
  comment,
  setComment,
  commentError,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border border-teal-500 rounded-md p-3"
      >
        <Textarea
          placeholder="Add a comment..."
          rows="3"
          maxLength="200"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <div className="flex justify-between items-center mt-5">
          <p className="text-gray-500 text-sm">
            {200 - comment.length} characters remaining
          </p>
          <Button outline gradientDuoTone="purpleToBlue" type="submit">
            Submit
          </Button>
        </div>
      </form>

      {commentError && (
        <Alert color="failure" className="mt-2">
          {commentError}
        </Alert>
      )}
    </>
  );
}
