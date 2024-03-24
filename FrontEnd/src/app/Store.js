//import react features
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { roomApi } from "../features/rooms/roomApi";
import { servicesApi } from "../features/services/servicesApi";
import { activityApi } from "../features/activities/activityApi";
import { offerApi } from "../features/offers/offerApi";

export const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware, servicesApi.middleware, activityApi.middleware, offerApi.middleware),
});

setupListeners(store.dispatch);
