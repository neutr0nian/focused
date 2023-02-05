import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const playlistsApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_SPOTIFY_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_SPOTIFY_API_HOST,
};

const baseUrl = "https://spotify23.p.rapidapi.com";

const createPlaylistsRequest = (url) => ({ url, headers: playlistsApiHeaders });

export const playlistsApi = createApi({
  reducerPath: "playlistsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getPlaylists: builder.query({
      query: (searchText) =>
        createPlaylistsRequest(
          `/search/?q=${searchText}&type=multi&offset=0&limit=10&numberOfTopResults=5`
        ),
    }),
  }),
});

export const { useGetPlaylistsQuery, useLazyGetPlaylistsQuery } = playlistsApi;
