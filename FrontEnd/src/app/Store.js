//import react features
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { roomApi } from "../features/rooms/roomApi";

export const store = configureStore({
  reducer: {
 
    [roomApi.reducerPath]: roomApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware)
});

setupListeners(store.dispatch);
