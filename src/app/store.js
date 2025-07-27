import { authApi } from "@/features/api/authApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { watchApi } from "@/features/api/watchApi";
import { watchProgressApi } from "@/features/api/watchProgressApi";
import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootRedcuer";

export const appStore = configureStore({
    reducer: rootRedcuer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, watchApi.middleware, purchaseApi.middleware, watchProgressApi.middleware)
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp();