//import react features
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { roomApi } from "../features/rooms/roomApi";
import { servicesApi } from "../features/services/servicesApi";
import { inquiryApi } from "../features/inquiries/inquiryApi";
import { galleryApi } from "../features/gallery/galleryApi";
import { meetingsApi } from "../features/meetings/meetingsApi";

export const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [meetingsApi.reducerPath]: meetingsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      servicesApi.middleware,
      galleryApi.middleware,
      meetingsApi.middleware
    ),
});

setupListeners(store.dispatch);
