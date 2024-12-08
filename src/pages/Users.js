import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchAllUsers from "../hooks/useFetchAllUsers";
import useEditUser from "../hooks/useEditUser";
import AddUserForm from "../components/AddUserForm";
import UserTable from "../components/UserTable";
import UserCard from "../components/UserCard";
import useDeleteUser from "../hooks/useDeleteUser";

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

  const toggleAddUserForm = () => {
    setShowAddUserForm(!showAddUserForm);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error}</div>;

  const userList = Array.isArray(users) ? users : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
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
          users={users}
          editedRow={editedRow}
          handleFieldChange={handleFieldChange}
          handleSaveEdit={handleSaveEdit}
          handleDelete={handleDelete}
        />
        <div className="sm:hidden">
          {userList.map((user) => (
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
