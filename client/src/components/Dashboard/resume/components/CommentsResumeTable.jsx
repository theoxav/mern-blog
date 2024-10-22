import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function CommentsResumeTable({ comments }) {
  return (
    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
      <div className="flex justify-between p-3 text-sm font-semibold">
        <h1 className="text-center p-2">Recent comments</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to={"/dashboard?tab=comments"}>See all</Link>
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Comment content</Table.HeadCell>
          <Table.HeadCell>Likes</Table.HeadCell>
        </Table.Head>
        {comments &&
          comments.map((comment) => (
            <Table.Body key={comment._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="w-96">
                  <p className="line-clamp-2">{comment.content}</p>
                </Table.Cell>
                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
      </Table>
    </div>
  );
}
