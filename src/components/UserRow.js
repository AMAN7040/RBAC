import React from "react";

const UserRow = ({
  user,
  editedRow,
  handleFieldChange,
  handleSaveEdit,
  handleDelete,
}) => (
  <tr key={user.id} className="hover:bg-gray-100">
    <td className="p-4">{user.name}</td>
    <td className="p-4">{user.email}</td>
    <td className="p-4">
      <select
        value={editedRow?.[user.id]?.role || user.role}
        className="px-2 py-1 border rounded"
        onChange={(e) => handleFieldChange(user.id, "role", e.target.value)}
      >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Manager">Manager</option>
      </select>
    </td>
    <td className="p-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={editedRow?.[user.id]?.status ?? user.status}
          onChange={(e) =>
            handleFieldChange(user.id, "status", e.target.checked)
          }
          className="opacity-0 w-0 h-0"
        />
        <span
          className={`w-6 h-6 rounded-full ${
            editedRow?.[user.id]?.status ?? user.status
              ? "bg-green-500"
              : "bg-red-500"
          } transition-all`}
        ></span>
      </label>
    </td>
    <td className="p-4 flex justify-evenly">
      <button
        className="text-blue-600 hover:text-blue-800"
        onClick={() => handleSaveEdit(user.id)}
      >
        Edit
      </button>
      <button
        className="text-red-600 hover:text-red-800"
        onClick={() => handleDelete(user.id)} // Trigger delete function
      >
        Delete
      </button>
    </td>
  </tr>
);

export default UserRow;
