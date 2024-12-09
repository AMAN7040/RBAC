import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRole } from "../../utils/roleSlice";
import { toast } from "react-toastify";

const AddRoleForm = ({ toggleAddRoleForm }) => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roleInfo);

  // Form state management
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({
    Read: false,
    Write: false,
    Delete: false,
    Update: false,
  });
  const [error, setError] = useState("");

  // Calculate the number of users assigned to the role
  const calculateUsersAssigned = () => {
    // Assuming roles have a `usersAssigned` field or something similar
    const role = roles.find((role) => role.roleName === roleName);
    return role ? role.usersAssigned : 0; // Return the number of users assigned to this role (default 0 if not found)
  };

  const [usersAssigned, setUsersAssigned] = useState(calculateUsersAssigned());

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

    // Create an array of selected permissions
    const selectedPermissions = Object.keys(permissions).filter(
      (permission) => permissions[permission]
    );
    if (selectedPermissions.length === 0) {
      setError("Please select at least one permission.");
      return; // Prevent further execution, but still show error
    } else {
      setError(""); // Clear error if permissions are selected
    }
    // Update usersAssigned based on the existing roles
    const updatedUsersAssigned = calculateUsersAssigned() + 1;

    const newRole = {
      roleName,
      usersAssigned: updatedUsersAssigned, // Increment the number of users assigned
      permissions: selectedPermissions,
    };

    try {
      const response = await fetch("http://localhost:5001/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addRole(data)); // Dispatch the new role to Redux store
        toast.success(`${roleName} Added Successfully`, 800);

        toggleAddRoleForm(); // Close the form modal

        // Reset form fields
        setRoleName("");
        setPermissions({
          Read: false,
          Write: false,
          Delete: false,
          Update: false,
        });
        setUsersAssigned(0); // Reset users assigned
      } else {
        throw new Error("Failed to add role");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Add Role", 800);
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
            onClick={toggleAddRoleForm}
            className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900"
          >
            &times;
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold">Add New Role</h2>

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
              {["Read", "Write", "Delete", "Update"].map((permission) => (
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
                Add Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRoleForm;
