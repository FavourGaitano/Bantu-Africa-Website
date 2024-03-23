import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityApi = createApi({
    reducerPath: "activityApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
    tagTypes: ['activities'],
    endpoints: (builder) => ({

        getActivities: builder.query({
            query: () => 'activity',
            providesTags: ['activities']
        }),

        addActivity: builder.mutation({
            query: (activity) => ({
                url: 'activity',
                method: 'POST',
                body: activity
            }),
            invalidatesTags: ['activities']
        }),

        updateActivity: builder.mutation({
            query: (activity) => ({
                url: `activity/${activity.ActivityId}`,
                method: 'PUT',
                body: activity
            }),
            invalidatesTags: ['activities']
        }),

        deleteActivity: builder.mutation({
            query: (ActivityId) => ({
                url: `activity/${ActivityId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['activities']
        })
        
    })
})

export const { 
    useGetActivitiesQuery,
    useAddActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation
} = activityApi;

