import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import UIModal from "../../UI/Modal/Modal";
import UserService from "../../../services/api/user.api";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashUsers() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/dashboard?tab=profile");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await UserService.getUsers();
        setUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch users: ", error);
      }
    };

    fetchUsers();
  }, [currentUser, navigate]);

  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const data = await UserService.getUsers(startIndex);

      setUsers((prevPosts) => [...prevPosts, ...data.users]);

      if (data.users.length < 5) {
        setShowMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch users: ", error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      await UserService.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete post: ", error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user, index) => (
              <Table.Body key={`${user._id}-${index}`} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className=" font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setUserId(user._id);
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
        <p>No posts yet</p>
      )}
      <UIModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalQuestion={`Are you sure you want to delete this user?`}
        handleConfirmModal={handleDeleteUser}
      />
    </div>
  );
}
