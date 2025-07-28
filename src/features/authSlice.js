import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  otp: {
    email: null,
    isSent: false,
    isVerified: false,
    attempts: 0,
    lastSent: null
  }
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // Reset OTP state after successful login
      state.otp = initialState.otp;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.otp = initialState.otp;
    },
    // New OTP-related reducers
    otpSent: (state, action) => {
      state.otp = {
        email: action.payload.email,
        isSent: true,
        isVerified: false,
        attempts: state.otp.attempts + 1,
        lastSent: new Date().toISOString()
      };
    },
    otpVerified: (state) => {
      state.otp.isVerified = true;
    },
    otpFailed: (state) => {
      state.otp.attempts += 1;
    },
    resetOtpState: (state) => {
      state.otp = initialState.otp;
    }
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  otpSent,
  otpVerified,
  otpFailed,
  resetOtpState
} = authSlice.actions;

export default authSlice.reducer;