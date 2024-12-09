import React from "react";

const RoleCard = ({ role, toggleEditRoleForm }) => (
  <div className="p-4 border border-gray-300 mb-4 rounded-lg sm:hidden">
    <div className="font-bold text-lg">Role : {role.roleName}</div>
    <div className="text-gray-500">Users Assigned : {role.usersAssigned}</div>
    <div className="text-gray-500">
      Permissions : {role.permissions.join(", ")}
    </div>
    <div className="mt-4 flex justify-evenly">
      <button
        onClick={() => toggleEditRoleForm(role)} // Pass the role to edit
        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
      >
        Edit
      </button>
    </div>
  </div>
);

export default RoleCard;
