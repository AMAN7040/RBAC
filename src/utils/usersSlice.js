import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: [],
  },
  reducers: {
    allUsers: (state, action) => {
      state.userInfo = action.payload;
    },

    addUser: (state, action) => {
      state.userInfo.push(action.payload);  // Adds new user
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.userInfo.findIndex((user) => user.id ===updatedUser.id);
      if(index!== -1){
        state.userInfo[index] = updatedUser;
      } 
    },
    removeUser: (state, action) => {
      state.userInfo = state.userInfo.filter(user => user.id !== action.payload);
    },
  },
});

export const { allUsers, addUser, updateUser,removeUser } = usersSlice.actions;

export default usersSlice.reducer;
