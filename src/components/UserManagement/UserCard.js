import React from "react";
import { useSelector } from "react-redux";

const UserCard = ({
  user,
  editedRow,
  handleFieldChange,
  handleSaveEdit,
  handleDelete,
}) => {
  const roles = useSelector((state) => state.roles.roleInfo);

  return (
    <div className="p-4 border border-gray-300 mb-4 rounded-lg">
      <div className="font-bold text-lg">Name: {user.name}</div>
      <div className="text-gray-500">Email: {user.email}</div>
      <div className="mt-2">
        {/* Dropdown for role selection */}
        <select
          value={editedRow?.[user.id]?.role || user.role} // Use editedRow value if available, otherwise use original user role
          className="px-2 py-1 border rounded"
          onChange={(e) => handleFieldChange(user.id, "role", e.target.value)} // Handle role change
        >
          {roles.length === 0 ? (
            <option>Loading roles...</option>
          ) : (
            roles.map((role) => (
              <option key={role.id} value={role.roleName}>
                {role.roleName}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="mt-2 flex items-center">
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
      </div>
      <div className="mt-4 flex space-x-2">
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
      </div>
    </div>
  );
};

export default UserCard;
