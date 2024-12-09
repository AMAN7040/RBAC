import { useState } from "react";
import {updateUser} from '../../utils/usersSlice';
import { toast } from "react-toastify";

const useEditUser = (users, dispatch, updateUserAction) => {
  const [editedRow, setEditedRow] = useState({});

  const handleFieldChange = (userId, field, value) => {
    setEditedRow((prev) => ({
      ...prev,
      [userId]: {
        ...prev?.[userId],
        [field]: value,
      },
    }));
  };

  const handleSaveEdit = async (userId) => {
    const updatedUser = {
      ...users.find((user) => user.id === userId),
      ...editedRow[userId],
    };

    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        dispatch(updateUser(updatedData));
        setEditedRow((prev) => {
          const newState = { ...prev };
          delete newState[userId];
          return newState;
        });
        toast.success("User Updated successfully",800);
      } else {
        toast.error("Failed to update user",800);
  
      }
    } catch (error) {
      toast.error("Error updating user",800);
    }
  };

  return { editedRow, handleFieldChange, handleSaveEdit };
};

export default useEditUser;
