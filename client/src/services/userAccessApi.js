import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const userAccessApiHeader = {
  "Content-Type": "application/json",
};
const baseUrl = "http://localhost:3000/api/v1/users";

// const createUserAccessRequest = (url) => {
//   url,
//   headers: userAccessApiHeader,
// });

export const userAccessApi = createApi({
  reducerPath: "userAccessApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    signup: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/signup",
        method: "POST",
        body: {
          name,
          email,
          password,
        },
      }),
    }),
    verify: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/verifyEmail",
        method: "POST",
        body: {
          email,
          otp,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyMutation } =
  userAccessApi;
