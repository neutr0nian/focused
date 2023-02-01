import { configureStore } from "@reduxjs/toolkit";
import { playlistsApi } from "../services/musicApi";

export default configureStore({
  reducer: {
    [playlistsApi.reducerPath]: playlistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playlistsApi.middleware),
});
