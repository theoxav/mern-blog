import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../../components/Dashboard/Layout/DashSidebar";
import DashProfile from "../../components/Dashboard/profile/DashProfile";
import DashPosts from "../../components/Dashboard/posts/DashPosts";
import DashUsers from "../../components/Dashboard/users/DashUsers";
import DashComments from "../../components/Dashboard/comment/DashComments";
import DashResume from "../../components/Dashboard/resume/DashResume";

export default function DashboardPage() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComments />}
      {tab === "dash" && <DashResume />}
    </div>
  );
}
