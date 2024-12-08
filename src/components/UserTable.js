import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ users, editedRow, handleFieldChange, handleSaveEdit, handleDelete }) => (
  <table className="min-w-full bg-white border border-gray-300 rounded-lg hidden sm:table">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-4 text-left">Name</th>
        <th className="p-4 text-left">Email</th>
        <th className="p-4 text-left">Role</th>
        <th className="p-4 text-left">Status</th>
        <th className="p-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          editedRow={editedRow}
          handleFieldChange={handleFieldChange}
          handleSaveEdit={handleSaveEdit}
          handleDelete={handleDelete}
        />
      ))}
    </tbody>
  </table>
);

export default UserTable;
