import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const activityApi =createApi({
    reducerPath: "activityApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/'}),
    tagTypes: ['actities'],
    endpoints: (builder) => ({
        getActivities: builder.query
    })
    
})