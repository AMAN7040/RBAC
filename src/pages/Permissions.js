import React, { useState } from "react";

const Permissions = () => {
  const [permissions, setPermissions] = useState([
    { id: 1, permissionName: "View Dashboard", role: "Admin" },
    { id: 2, permissionName: "Edit Profile", role: "User" },
    { id: 3, permissionName: "Delete User", role: "Admin" },
  ]);

  // Handle permission deletion
  const handleDeletePermission = (id) => {
    setPermissions(permissions.filter((permission) => permission.id !== id));
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Permissions</th>
            <th className="p-3 text-left">Assigned Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-100">
              <td className="p-3">{permission.permissionName}</td>
              <td className="p-3">{permission.role}</td>
              <td className="p-3 flex space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => alert("Edit permission " + permission.permissionName)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeletePermission(permission.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
