import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../../../hooks/auth/useLogout";
import { useSelector } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { handleSignout } = useLogout();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                as="div"
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                labelColor="dark"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              as="div"
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : ""}
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item
                  as="div"
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  labelColor="dark"
                >
                  Posts
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  as="div"
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  labelColor="dark"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  as="div"
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  labelColor="dark"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}

          <Sidebar.Item
            onClick={handleSignout}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
