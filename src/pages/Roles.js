import React, { useState } from "react";
import RoleTable from "../components/RolesMangement/RoleTable";
import RoleCard from "../components/RolesMangement/RoleCard";
import AddRoleForm from "../components/RolesMangement/AddRoleForm";
import EditRoleForm from "../components/RolesMangement/EditRoleForm"; // Import EditRoleForm
import useFetchAllRoles from "../hooks/RoleManagement/useFetchAlRoles";
import { useSelector } from "react-redux";

const Roles = () => {
  const { loading, error } = useFetchAllRoles();
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);
  const [showEditRoleForm, setShowEditRoleForm] = useState(false); // State for Edit form
  const [roleToEdit, setRoleToEdit] = useState(null); // State to store the role to edit
  const roles = useSelector((state) => state.roles.roleInfo);
  const toggleAddRoleForm = () => {
    setShowAddRoleForm(!showAddRoleForm);
  };

  const toggleEditRoleForm = (role) => {
    setRoleToEdit(role);
    setShowEditRoleForm(!showEditRoleForm);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching roles: {error}</div>;

  if (!roles || !Array.isArray(roles)) {
    return <div>No roles available</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Roles</h1>
        <button
          onClick={toggleAddRoleForm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Role
        </button>
      </div>

      {showAddRoleForm && <AddRoleForm toggleAddRoleForm={toggleAddRoleForm} />}

      {/* Show edit form if state is true */}
      {showEditRoleForm && (
        <EditRoleForm
          toggleEditRoleForm={toggleEditRoleForm}
          roleToEdit={roleToEdit}
        />
      )}

      <div className="overflow-x-auto">
        {/* Table for Desktop */}
        <RoleTable
          roles={roles}
          toggleEditRoleForm={toggleEditRoleForm} // Pass function to each role for editing
        />

        {/* Cards for Mobile */}
        <div className="sm:hidden">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              toggleEditRoleForm={toggleEditRoleForm} // Pass function to each role for editing
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roles;
