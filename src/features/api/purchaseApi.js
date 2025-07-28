import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (watchId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { watchId },
      }),
    }),
    getWatchDetailWithStatus: builder.query({
      query: (watchId) => ({
        url: `/watch/${watchId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedWatchs: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetWatchDetailWithStatusQuery,
  useGetPurchasedWatchsQuery,
} = purchaseApi;
