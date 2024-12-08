import React, { useState } from "react";

const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, roleName: "Admin", description: "Full access" },
    { id: 2, roleName: "User", description: "Limited Access-View only" },
  ]);

  // Handle role deletion
  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Roles</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-100">
              <td className="p-4">{role.roleName}</td>
              <td className="p-4">{role.description}</td>
              <td className="p-4 flex space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => alert("Edit role " + role.roleName)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteRole(role.id)}
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

export default Roles;
