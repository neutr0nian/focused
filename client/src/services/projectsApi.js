import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getRequestHeader } from "../utils/helper";

const baseUrl = import.meta.env.VITE_TEST_BASE_URL + "/projects";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (token) => ({ url: "/show", headers: getRequestHeader(token) }),
    }),
    createProject: builder.mutation({
      query: ({ project, token }) => ({
        url: "/create",
        method: "POST",
        headers: getRequestHeader(token),
        body: {
          project,
        },
      }),
    }),
    updateProject: builder.mutation({
      query: ({ project, token }) => ({
        url: "/update",
        method: "PUT",
        headers: getRequestHeader(token),
        body: {
          project,
        },
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;
