import { authApi } from "@/features/api/authApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { watchApi } from "@/features/api/watchApi";
import { watchProgressApi } from "@/features/api/watchProgressApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

const rootRedcuer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [watchApi.reducerPath]: watchApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [watchProgressApi.reducerPath]: watchProgressApi.reducer,
    auth: authReducer,
});
export default rootRedcuer;