import React from "react";
import { useSelector } from "react-redux"; // Import useSelector from react-redux

const UserRow = ({
  user,
  editedRow,
  handleFieldChange,
  handleSaveEdit,
  handleDelete,
}) => {
  // Use useSelector inside the component to fetch roles from the Redux store
  const roles = useSelector((state) => state.roles.roleInfo);

  return (
    <tr key={user.id} className="hover:bg-gray-100">
      <td className="p-4">{user.name}</td>
      <td className="p-4">{user.email}</td>
      <td className="p-4">
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
      </td>
      <td className="p-4">
        {/* Checkbox for status */}
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={editedRow?.[user.id]?.status ?? user.status} // Use editedRow status if available, otherwise use original user status
            onChange={
              (e) => handleFieldChange(user.id, "status", e.target.checked) // Handle status change
            }
            className="opacity-0 w-0 h-0" // Invisible checkbox
          />
          <span
            className={`w-6 h-6 rounded-full ${
              editedRow?.[user.id]?.status ?? user.status
                ? "bg-green-500" // Green if active
                : "bg-red-500" // Red if inactive
            } transition-all`}
          ></span>
        </label>
      </td>
      <td className="p-4 flex justify-evenly">
        {/* Button to trigger save edit */}
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => handleSaveEdit(user.id)} // Trigger save edit function
        >
          Save
        </button>
        {/* Button to trigger delete */}
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => handleDelete(user.id, user.role)} // Trigger delete function
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
