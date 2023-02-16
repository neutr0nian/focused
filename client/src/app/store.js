import { configureStore } from "@reduxjs/toolkit";
import { playlistsApi } from "../services/musicApi";
import { userAccessApi } from "../services/userAccessApi";

export default configureStore({
  reducer: {
    [playlistsApi.reducerPath]: playlistsApi.reducer,
    [userAccessApi.reducerPath]: userAccessApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      playlistsApi.middleware,
      userAccessApi.middleware
    ),
});
