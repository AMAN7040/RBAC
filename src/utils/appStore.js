import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './usersSlice';
import roleReducer from './roleSlice';

const appstore  = configureStore({
    reducer: {
        users: usersReducer,
        roles: roleReducer,
      },
});

export default appstore;