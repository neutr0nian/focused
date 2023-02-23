import { configureStore } from "@reduxjs/toolkit";
import { playlistsApi } from "../services/musicApi";
import { tasksApi } from "../services/tasksApi";
import { userAccessApi } from "../services/userAccessApi";
import { projectsApi } from "../services/projectsApi";
import tasksReducer from "../components/tasks/taskSlice";
import projectsReducer from "../components/projects/projectSlice";

export default configureStore({
  reducer: {
    [playlistsApi.reducerPath]: playlistsApi.reducer,
    [userAccessApi.reducerPath]: userAccessApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    tasks: tasksReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      playlistsApi.middleware,
      userAccessApi.middleware,
      tasksApi.middleware,
      projectsApi.middleware
    ),
});
