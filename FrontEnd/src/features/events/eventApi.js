import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['events'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'events',
      providesTags: ['events']
    }),
    
    getSingleEvent: builder.query({
      query: (upcommingEventId) => `events/single${upcommingEventId}`,
      providesTags: ['events']
    }),

    addEvent: builder.mutation({
      query: (event) => ({
        url: 'events',
        method: 'POST',
        body: event
      }),
      invalidatesTags: ['events']
    }),

    updateEvent: builder.mutation({
      query: (events) => ({
        url: `events/update/${events.upcommingEventId}`,
        method: 'PUT',
        body: events
      }),
      invalidatesTags: ['events']
    }),

    deleteEvent: builder.mutation({
      query: (upcommingEventId) => ({
        url: `events/delete/${upcommingEventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['events']
    })
  })
});

export const {
  useGetEventsQuery,
  useGetSingleEventQuery,
  useAddEventMutation,
  useUpdateEventMutation
} = eventApi;
