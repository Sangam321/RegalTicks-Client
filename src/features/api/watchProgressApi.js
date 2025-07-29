import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API = "https://localhost:8080/api/v1/progress";

export const watchProgressApi = createApi({
  reducerPath: "watchProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getWatchProgress: builder.query({
      query: (watchId) => ({
        url: `/${watchId}`,
        method: "GET",
      }),
    }),
    updateWatch_DetailsProgress: builder.mutation({
      query: ({ watchId, watch_detailsId }) => ({
        url: `/${watchId}/watch_details/${watch_detailsId}/view`,
        method: "POST"
      }),
    }),

    completeWatch: builder.mutation({
      query: (watchId) => ({
        url: `/${watchId}/complete`,
        method: "POST"
      })
    }),
    inCompleteWatch: builder.mutation({
      query: (watchId) => ({
        url: `/${watchId}/incomplete`,
        method: "POST"
      })
    }),

  }),
});
export const {
  useGetWatchProgressQuery,
  useUpdateWatch_DetailsProgressMutation,
  useCompleteWatchMutation,
  useInCompleteWatchMutation
} = watchProgressApi;
