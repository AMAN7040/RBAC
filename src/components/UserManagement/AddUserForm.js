import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/usersSlice";
import { updateRole } from "../../utils/roleSlice";
import { toast } from "react-toastify";

const AddUserForm = ({ toggleAddUserForm }) => {
  const dispatch = useDispatch();

  // Use useSelector to get the roles from Redux state
  const roles = useSelector((state) => state.roles.roleInfo);

  // Form state management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      role,
      status,
    };

    try {
      // Post new user to the backend
      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addUser(data)); // Add the user to the store
        toast.success("User Added Successfully",800);

        // Find the role and update the usersAssigned count
        const currentRole = roles.find((r) => r.roleName === role);

        if (currentRole) {
          // Increment the usersAssigned count for this role
          const newCount = currentRole.usersAssigned + 1;

          // Dispatch action to update the role's usersAssigned count in Redux
          dispatch(
            updateRole({
              roleName: currentRole.roleName,
              newCount, // Updated usersAssigned count
            })
          );

          // Ensure that currentRole.id exists before making the PUT request
          if (currentRole.id) {
            // 3. Update the usersAssigned count in the MockAPI roles endpoint
            const roleResponse = await fetch(
              `http://localhost:5001/roles/${currentRole.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...currentRole,
                  usersAssigned: newCount,
                }),
              }
            );

            if (roleResponse.ok) {
            } else {
              console.error("Failed to add user");
            }
          } else {
            console.error("Role ID is missing for:", currentRole);
          }
        }

        // Close the form after submission
        toggleAddUserForm();

        // Reset form fields
        setName("");
        setEmail("");
        setRole("Admin");
        setStatus(false);
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      toast.error('Failed to add User',1000);
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
            onClick={toggleAddUserForm}
            className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900"
          >
            &times;
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold">Add New User</h2>

            {/* Name input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role select */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Client">Client</option>
              </select>
            </div>

            {/* Status checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={status}
                onChange={() => setStatus(!status)}
                className="mr-2"
              />
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Active
              </label>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;
