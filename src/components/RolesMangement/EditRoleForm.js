// EditRoleForm.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editRole } from "../../utils/roleSlice";
import { toast } from "react-toastify";

const EditRoleForm = ({ toggleEditRoleForm, roleToEdit }) => {
  const dispatch = useDispatch();

  // Form state management
  const [roleName, setRoleName] = useState(roleToEdit.roleName);
  const [permissions, setPermissions] = useState({
    Create: roleToEdit.permissions.includes("Create"),
    Read: roleToEdit.permissions.includes("Read"),
    Delete: roleToEdit.permissions.includes("Delete"),
    Update: roleToEdit.permissions.includes("Update"),
  });

  const [error, setError] = useState("");

  // Handle permission change
  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPermissions = Object.keys(permissions).filter(
      (permission) => permissions[permission]
    );

    if (updatedPermissions.length === 0) {
      setError("Please select at least one permission.");
      return; // Prevent further execution, but still show error
    } else {
      setError(""); // Clear error if permissions are selected
    }

    const updatedRole = {
      ...roleToEdit,
      roleName,
      permissions: updatedPermissions,
    };

    try {
      // Send PUT request to update role on the server
      const response = await fetch(
        `http://localhost:5001/roles/${roleToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRole),
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(editRole(data)); // Dispatch the updated role to Redux store
        toast.success(`${roleName} role Updated successfully`, 800);
        toggleEditRoleForm(); // Close the form modal
      } else {
        throw new Error("Failed to update role");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Role", 800);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Centered form */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-full max-w-lg sm:max-w-md p-6 bg-white border rounded-lg shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={toggleEditRoleForm}
            className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900"
          >
            &times;
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold">Edit Role</h2>

            {/* Role Name input */}
            <div>
              <label
                htmlFor="roleName"
                className="block text-sm font-medium text-gray-700"
              >
                Role Name
              </label>
              <input
                type="text"
                id="roleName"
                name="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Permissions checkboxes */}
            <div>
              <p className="block text-sm font-medium text-gray-700">
                Permissions
              </p>
              {["Create", "Read", "Delete", "Update"].map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={permission}
                    name={permission}
                    checked={permissions[permission]}
                    onChange={handlePermissionChange}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <label
                    htmlFor={permission}
                    className="text-sm font-medium text-gray-700"
                  >
                    {permission}
                  </label>
                </div>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRoleForm;
