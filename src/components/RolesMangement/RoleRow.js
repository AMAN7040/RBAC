import React from "react";

const RoleRow = ({ role, toggleEditRoleForm }) => (
  <tr key={role.id} className="hover:bg-gray-100">
    <td className="p-4">{role.roleName}</td>
    <td className="p-4">{role.usersAssigned}</td>
    <td className="p-4">{role.permissions.join(", ")}</td>
    <td className="p-4">
      <button
        onClick={() => toggleEditRoleForm(role)}
        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
      >
        Edit
      </button>
    </td>
  </tr>
);

export default RoleRow;
