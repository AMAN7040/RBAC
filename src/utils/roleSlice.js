import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roleInfo: [],
  },

  reducers: {
    // Action to set all roles
    allRoles: (state, action) => {
      state.roleInfo = action.payload;
    },

    // Action to add a new role
    addRole: (state, action) => {
      state.roleInfo.push(action.payload); // Adds new role
    },

    // Action to update the usersAssigned field for a specific role
    updateRole: (state, action) => {
      const { roleName, newCount } = action.payload;
      const role = state.roleInfo.find((role) => role.roleName === roleName);

      if (role) {
        role.usersAssigned = newCount; // Update the usersAssigned count for the role
      }
    },
    updateDeletedRole: (state, action) => {
      const { roleName, newCount } = action.payload;
      const role = state.roleInfo.find((role) => role.roleName === roleName);

      if (role) {
        role.usersAssigned = newCount; // Update the usersAssigned count for the role
      }
    },
    editRole: (state, action) => {
      const index = state.roleInfo.findIndex(
        (role) => role.id === action.payload.id
      );
      if (index !== -1) {
        state.roleInfo[index] = action.payload;
      }
    },
  },
});

export const { allRoles, addRole, updateRole, editRole, updateDeletedRole } =
  roleSlice.actions;

export default roleSlice.reducer;
