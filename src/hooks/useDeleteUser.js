import { useDispatch } from "react-redux";
import { removeUser } from "../utils/usersSlice";

const useDeleteUser = () => {
  const dispatch = useDispatch();

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Dispatch Redux action to remove user from global state
        dispatch(removeUser(userId));

        alert("User deleted successfully.");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user.");
    }
  };

  return { handleDelete };
};

export default useDeleteUser;
