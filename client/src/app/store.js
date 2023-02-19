import { configureStore } from "@reduxjs/toolkit";
import { playlistsApi } from "../services/musicApi";
import { tasksApi } from "../services/tasksApi";
import { userAccessApi } from "../services/userAccessApi";
import tasksReducer from "../components/tasks/taskSlice";

export default configureStore({
  reducer: {
    [playlistsApi.reducerPath]: playlistsApi.reducer,
    [userAccessApi.reducerPath]: userAccessApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      playlistsApi.middleware,
      userAccessApi.middleware,
      tasksApi.middleware
    ),
});
