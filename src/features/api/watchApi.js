import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "https://localhost:8080/api/v1/watch";

export const watchApi = createApi({
  reducerPath: "watchApi",
  tagTypes: ["Refetch_Creator_Watch", "Refetch_Watch_Details"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createWatch: builder.mutation({
      query: ({ watchTitle, category }) => ({
        url: "",
        method: "POST",
        body: { watchTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Watch"],
    }),
    getSearchWatch: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        // Build qiery string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

        // append cateogry 
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }

        // Append sortByPrice is available
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        }
      }
    }),
    getPublishedWatch: builder.query({
      query: () => ({
        url: "/published-watchs",
        method: "GET",
      }),
    }),
    getCreatorWatch: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Watch"],
    }),
    editWatch: builder.mutation({
      query: ({ formData, watchId }) => ({
        url: `/${watchId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Watch"],
    }),
    getWatchById: builder.query({
      query: (watchId) => ({
        url: `/${watchId}`,
        method: "GET",
      }),
    }),
    createWatch_Details: builder.mutation({
      query: ({ watch_detailsTitle, watchId }) => ({
        url: `/${watchId}/watch_details`,
        method: "POST",
        body: { watch_detailsTitle },
      }),
    }),
    getWatchWatch_Details: builder.query({
      query: (watchId) => ({
        url: `/${watchId}/watch_details`,
        method: "GET",
      }),
      providesTags: ["Refetch_Watch_Details"],
    }),
    editWatch_Details: builder.mutation({
      query: ({
        watch_detailsTitle,
        videoInfo,
        isPreviewFree,
        watchId,
        watch_detailsId,
      }) => ({
        url: `/${watchId}/watch_details/${watch_detailsId}`,
        method: "POST",
        body: { watch_detailsTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeWatch_Details: builder.mutation({
      query: (watch_detailsId) => ({
        url: `/watch_details/${watch_detailsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Watch_Details"],
    }),
    getWatch_DetailsById: builder.query({
      query: (watch_detailsId) => ({
        url: `/watch_details/${watch_detailsId}`,
        method: "GET",
      }),
    }),
    publishWatch: builder.mutation({
      query: ({ watchId, query }) => ({
        url: `/${watchId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
  }),
});
export const {
  useCreateWatchMutation,
  useGetSearchWatchQuery,
  useGetPublishedWatchQuery,
  useGetCreatorWatchQuery,
  useEditWatchMutation,
  useGetWatchByIdQuery,
  useCreateWatch_DetailsMutation,
  useGetWatchWatch_DetailsQuery,
  useEditWatch_DetailsMutation,
  useRemoveWatch_DetailsMutation,
  useGetWatch_DetailsByIdQuery,
  usePublishWatchMutation,
} = watchApi;
