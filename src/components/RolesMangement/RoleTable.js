import React from "react";
import RoleRow from "./RoleRow";

const RoleTable = ({ roles, toggleEditRoleForm }) => (
  <table className="min-w-full bg-white border border-gray-300 rounded-lg hidden sm:table">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-4 text-left">Role Name</th>
        <th className="p-4 text-left">Users Assigned</th>
        <th className="p-4 text-left">Permissions</th>
        <th className="p-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {roles.map((role) => (
        <RoleRow
          key={role.id}
          role={role}
          toggleEditRoleForm={toggleEditRoleForm}
        />
      ))}
    </tbody>
  </table>
);

export default RoleTable;
