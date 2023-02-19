import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const tasksApiHeader = (token) => {
  console.log(token);
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
};

const baseUrl = import.meta.env.VITE_TEST_BASE_URL + "/tasks";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (token) => ({ url: "/show", headers: tasksApiHeader(token) }),
    }),
    createTask: builder.mutation({
      query: ({ task, token }) => ({
        url: "/create",
        method: "POST",
        headers: tasksApiHeader(token),
        body: {
          task,
          token,
        },
      }),
    }),
    updateTask: builder.mutation({
      query: ({ task, token }) => ({
        url: "/update",
        method: "PATCH",
        headers: tasksApiHeader(token),
        body: {
          task,
        },
      }),
    }),
    deleteTask: builder.mutation({
      query: (task, token) => ({
        url: "/delete",
        method: "DELETE",
        headers: tasksApiHeader(token),
        body: {
          task,
        },
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
} = tasksApi;
