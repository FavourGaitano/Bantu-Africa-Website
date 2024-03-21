import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['events'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'events',
      providesTags: ['events']
    }),

    getSingleEvents: builder.query({
      query: (EventId) => `events/${EventId}`,
      providesTags: ['events']
    }),

    addEvent: builder.mutation({
      query: (eventPosts) => ({
        url: 'events',
        method: 'POST',
        body: eventPosts
      }),
      invalidatesTags: ['events']
    }),

    updateEvent: builder.mutation({
      query: (events) => ({
        url: `eventPosts/update/${events.EventId}`,
        method: 'PUT',
        body: events
      }),
      invalidatesTags: ['events']
    }),

    deleteEvent: builder.mutation({
      query: (EventId) => ({
        url: `events/delete/${EventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['events']
    })
  })
});

export const {
  useGetEventsQuery,
  useGetSingleEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation
} = eventApi;
