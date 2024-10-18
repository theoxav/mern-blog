import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

import s from "./PostDetail.module.css";

export default function PostDetail({ post }) {
  console.log(post);

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen bg-white dark:bg-gray-800">
      <h1
        className={`text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl ${s.content}`}
      >
        {post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post.category}
        </Button>
      </Link>
      <img
        src={post.image}
        className="mt-10 p-3 max-h-[800px] w-full object-cover"
        alt={post.title}
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full text-xs text-gray-700 dark:text-gray-300">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className={`p-3 mx-auto w-full ${s.content}`}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </main>
  );
}
