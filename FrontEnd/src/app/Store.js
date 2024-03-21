//import react features
import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { eventApi } from '../features/events/eventApi';


export const store=configureStore({
    reducer:{
        [eventApi.reducerPath]:eventApi.reducer,
    },

    middleware:(getDefaultMiddleware)=>getDefaultMiddleware(eventApi.middleware)
    .concat(
        
        )
    }, 
)

setupListeners(store.dispatch)