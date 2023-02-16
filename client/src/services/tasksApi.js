import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const tasksApiHeader = (token) => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
});

const baseUrl = import.meta.env.VITE_TEST_BASE_URL + "/tasks";

export const userAccessApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/show",
    }),
    createTask: builder.mutation({
      query: (task, token) => ({
        url: "/create",
        method: "POST",
        headers: tasksApiHeader(token),
        body: {
          task,
        },
      }),
    }),
    updateTask: builder.mutation({
      query: (task, token) => ({
        url: "/update",
        method: "PUT",
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
