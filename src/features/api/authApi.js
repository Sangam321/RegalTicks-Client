import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        // Existing endpoints
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
            }),
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // Only dispatch login if OTP is not required or already verified
                    if (result.data.user?.isVerified) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET",
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "profile/update",
                method: "PUT",
                body: formData,
                credentials: "include",
            }),
        }),

        // New OTP endpoints
        verifyOtp: builder.mutation({
            query: (otpData) => ({
                url: "verify-otp",
                method: "POST",
                body: otpData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result.data.success) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        resendOtp: builder.mutation({
            query: (emailData) => ({
                url: "resend-otp",
                method: "POST",
                body: emailData,
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
} = authApi;