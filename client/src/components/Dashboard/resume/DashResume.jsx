import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../../../services/api/user.api";
import PostService from "../../../services/api/post.api";
import CommentService from "../../../services/api/comment.api";

import {
  HiOutlineUserGroup,
  HiAnnotation,
  HiDocumentText,
} from "react-icons/hi";
import StatCard from "./components/StatCard";
import UsersResumeTable from "./components/UsersResumeTable";
import CommentsResumeTable from "./components/CommentsResumeTable";
import PostsResumeTable from "./components/PostsResumeTable";
import { useNavigate } from "react-router-dom";

export default function DashboardResume() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/dashboard?tab=profile");
      return;
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, postsData, commentsData] = await Promise.all([
          UserService.getUsers({ limit: 5 }),
          PostService.getPosts({ limit: 5 }),
          CommentService.getComments({ limit: 5 }),
        ]);

        setUsers(usersData.users);
        setTotalUsers(usersData.users.length);
        setLastMonthUsers(usersData.lastMonthUsers);

        setPosts(postsData.posts);
        setTotalPosts(postsData.posts.length);
        setLastMonthPosts(postsData.lastMonthPosts);

        setComments(commentsData.comments);
        setLastMonthComments(commentsData.lastMonthComments);
        setTotalComments(commentsData.comments.length);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };

    if (currentUser && currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <StatCard
          title="Total Users"
          total={totalUsers}
          lastMonth={lastMonthUsers}
          icon={
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          }
        />
        <StatCard
          title="Total Comments"
          total={totalComments}
          lastMonth={lastMonthComments}
          icon={
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          }
        />
        <StatCard
          title="Total Posts"
          total={totalPosts}
          lastMonth={lastMonthPosts}
          icon={
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          }
        />
      </div>

      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <UsersResumeTable users={users} />
        <CommentsResumeTable comments={comments} />
        <PostsResumeTable posts={posts} />
      </div>
    </div>
  );
}
