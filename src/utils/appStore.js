import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './usersSlice';

const appstore  = configureStore({
    reducer: {
        users: usersReducer,
      },
});

export default appstore;