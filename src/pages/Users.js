import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUserForm from "../components/UserManagement/AddUserForm";
import UserTable from "../components/UserManagement/UserTable";
import UserCard from "../components/UserManagement/UserCard";
import useDeleteUser from "../hooks/UserMangement/useDeleteUser";
import useFetchAllUsers from "../hooks/UserMangement/useFetchAllUsers";
import useEditUser from "../hooks/UserMangement/useEditUser";

const Users = () => {
  const { loading, error } = useFetchAllUsers();
  const users = useSelector((state) => state.users.userInfo);
  const { handleDelete } = useDeleteUser(users);
  const dispatch = useDispatch();
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const { editedRow, handleFieldChange, handleSaveEdit } = useEditUser(
    users,
    dispatch,
    (data) => ({ type: "UPDATE_USER", payload: data })
  );
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAddUserForm = () => {
    setShowAddUserForm(!showAddUserForm);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error}</div>;

  const userList = Array.isArray(users) ? users : [];

  // Filter users based on search query
  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Replace 'name' with the correct property
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) || // Add more fields if needed
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) // Add more fields if needed
  );

  if (userList.length === 0){
    return(
      <div>
        <div className="flex flex-col space-y-6 justify-center items-center mb-4">
          <h1 className="text-2xl font-bold">NO USERS</h1>
          <button
            onClick={toggleAddUserForm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
        {showAddUserForm && <AddUserForm toggleAddUserForm={toggleAddUserForm} />}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <input
          type="text"
          placeholder="Search users by Name, Email or Role......."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-1 py-2 border rounded w-[30%] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={toggleAddUserForm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      {showAddUserForm && <AddUserForm toggleAddUserForm={toggleAddUserForm} />}

      <div className="overflow-x-auto">
        <UserTable
          users={filteredUsers}
          editedRow={editedRow}
          handleFieldChange={handleFieldChange}
          handleSaveEdit={handleSaveEdit}
          handleDelete={handleDelete}
        />
        
        <div className="sm:hidden">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              editedRow={editedRow}
              handleFieldChange={handleFieldChange}
              handleSaveEdit={handleSaveEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
