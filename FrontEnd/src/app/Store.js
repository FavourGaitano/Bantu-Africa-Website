//import react features
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { roomApi } from "../features/rooms/roomApi";
import { servicesApi } from "../features/services/servicesApi";
import { activityApi } from "../features/activities/activityApi";
import { offerApi } from "../features/offers/offerApi";
import { inquiryApi } from "../features/inquiries/inquiryApi";
import { galleryApi } from "../features/gallery/galleryApi";
import { meetingsApi } from "../features/meetings/meetingsApi";
import { restaurantApi } from "../features/restaurant/restaurantApi";

export const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [meetingsApi.reducerPath]: meetingsApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      servicesApi.middleware,
      activityApi.middleware,
      offerApi.middleware,
      galleryApi.middleware,
      meetingsApi.middleware,
      restaurantApi.middleware
    ),
      
  });

setupListeners(store.dispatch);
