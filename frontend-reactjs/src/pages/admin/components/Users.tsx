import { http, httpError } from "@/assets/http";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CircularProgress,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import UpdateUser from "./UpdateUser";

function Users() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [isDeleteModalActive, setDeleteModalActive] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [activeUpdateUserId, setActiveUpdateUserId] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchUsers = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      try {
        const response = await http.get("/admins/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data = response.data;
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users
      } catch (error) {
        httpError(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users) {
      setFilteredUsers(
        users.filter((user) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, users]);

  const handleDeleteUser = (id: string) => {
    setSelectedUserId(id);
    setDeleteModalActive(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    if (selectedUserId) {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        await http.delete(`/admins/users/${selectedUserId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUsers(users?.filter((user) => user.id !== selectedUserId) || []);
      } catch (error) {
        httpError(error);
      } finally {
        setDeleteModalActive(false);
        setSelectedUserId(null);
      }
    }
    setLoading(false);
  };

  const handleCloseModal = () => {
    setDeleteModalActive(false);
    setSelectedUserId(null);
  };

  const toggleUpdateMenu = (userId: string) => {
    if (activeUpdateUserId === userId) {
      setActiveUpdateUserId(null); // Close menu if it is already open
    } else {
      setActiveUpdateUserId(userId); // Open menu for the selected user
    }
  };

  if (users === null) {
    return (
      <div>
        <Navigation />
        <div className="grid place-items-center h-screen">
          <CircularProgress size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div className="p-10">
        <Input
          isClearable
          placeholder="Search users..."
          width="100%"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <Card key={index} shadow="sm" className="p-10 m-5">
              <CardBody>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-2 flex items-center justify-center">
                    <Avatar
                      showFallback
                      src={
                        user.profilePhotoPath ||
                        "https://images.unsplash.com/broken"
                      }
                    />
                  </div>
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <p className="font-bold">{user.email}</p>
                    <p className="text-gray-500">{user.role}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {user.cart ? (
                      <>
                        <i className="fas fa-shopping-cart fa-2xl mr-2"></i>
                        <p>{user.cart.items.length}</p>
                      </>
                    ) : (
                      <p>No Cart</p>
                    )}
                  </div>
                  <div className="col-span-3">
                    <Button
                      color="warning"
                      onClick={() => toggleUpdateMenu(user.id)}
                    >
                      <i
                        style={{ color: "white" }}
                        className="fa-solid fa-pen-to-square fa-xl"
                      ></i>
                    </Button>
                  </div>
                  <div className="col-span-3">
                    <Button
                      color="danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i
                        style={{ color: "white" }}
                        className="fa-solid fa-trash fa-xl"
                      ></i>
                    </Button>
                  </div>
                </div>

                {activeUpdateUserId === user.id && (
                  <div className="mt-6">
                    <UpdateUser user={user} setState={setActiveUpdateUserId} />
                  </div>
                )}
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="p-10 text-center">No users found</div>
        )}
      </div>
      {isDeleteModalActive && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={handleCloseModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete this user?
              </h3>
              <Button
                isLoading={isLoading}
                color="danger"
                onClick={handleConfirmDelete}
                className="text-white bg-red-600 hover:bg-red-800"
              >
                Yes, I'm sure
              </Button>
              <Button
                color="default"
                onClick={handleCloseModal}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 border border-gray-200 bg-white hover:bg-gray-100"
              >
                No, cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
