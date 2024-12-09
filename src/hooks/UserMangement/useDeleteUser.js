import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/usersSlice";
import { toast } from "react-toastify";
import { updateDeletedRole } from "../../utils/roleSlice";

const useDeleteUser = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roleInfo);
  const handleDelete = async (userId,role) => {
    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Dispatch Redux action to remove user from global state
        dispatch(removeUser(userId));
        toast.success("User deleted successfully", 800);

        const currentRole = roles.find((r) => r.roleName === role);

        if (currentRole) {
          // Increment the usersAssigned count for this role
          const newCount = currentRole.usersAssigned - 1;

          // Dispatch action to update the role's usersAssigned count in Redux
          dispatch(
            updateDeletedRole({
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
              console.error("Failed to Update Role");
            }
          } else {
            toast.warn("Missing Role", 800);
          }
        }
      } else {
        toast.error("Failed to Delete User", 800);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.warn("Error Deleting User", 800);
    }
  };

  return { handleDelete };
};

export default useDeleteUser;
