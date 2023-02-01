import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log("KEY: ", import.meta.env.VITE_SPOTIFY_API_KEY);
const searchApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_SPOTIFY_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_SPOTIFY_API_HOST,
};

const playlistsApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_SPOTIFY_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_SPOTIFY_API_HOST,
};

const baseUrl = "https://spotify23.p.rapidapi.com";

const createSearchRequest = (url) => ({ url, headers: searchApiHeaders });
const createPlaylistsRequest = (url) => ({ url, headers: playlistsApiHeaders });

export const playlistsApi = createApi({
  reducerPath: "playlistsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getPlaylists: builder.query({
      query: (search) =>
        createPlaylistsRequest(
          `/search/?q=studymusic&type=multi&offset=0&limit=10&numberOfTopResults=5`
        ),
    }),
  }),
});

export const { useGetPlaylistsQuery } = playlistsApi;
