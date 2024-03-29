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
import { otherServiceApi } from "../features/otherServices/otherServices";
import { userApi } from "../features/users/userApi";
import { bookingsApi } from "../features/bookings/bookingsApi";
import { restaurantApi } from "../features/restaurant/restaurantApi";
import { eventApi } from "../features/events/eventApi";
import { roomCategoryApi } from "../features/roomCategory/roomCategoryApi";

export const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [meetingsApi.reducerPath]: meetingsApi.reducer,
    [otherServiceApi.reducerPath]: otherServiceApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [roomCategoryApi.reducerPath]: roomCategoryApi.reducer,
    
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      servicesApi.middleware,
      activityApi.middleware,
      offerApi.middleware,
      galleryApi.middleware,
      meetingsApi.middleware,
      otherServiceApi.middleware,
      userApi.middleware,
      bookingsApi.middleware,
      restaurantApi.middleware,
      eventApi.middleware,
      roomCategoryApi.middleware,
    ),
      
  });

setupListeners(store.dispatch);

