import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authAPi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authAPi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware
    ),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authAPi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
