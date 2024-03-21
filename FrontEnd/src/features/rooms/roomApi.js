
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['rooms'],
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => 'rooms',
      providesTags: ['rooms']
    }),

    // getSingleEvents: builder.query({
    //   query: (EventId) => `events/${EventId}`,
    //   providesTags: ['events']
    // }),

    // addEvent: builder.mutation({
    //   query: (eventPosts) => ({
    //     url: 'events',
    //     method: 'POST',
    //     body: eventPosts
    //   }),
    //   invalidatesTags: ['events']
    // }),

    // updateEvent: builder.mutation({
    //   query: (events) => ({
    //     url: `eventPosts/update/${events.EventId}`,
    //     method: 'PUT',
    //     body: events
    //   }),
    //   invalidatesTags: ['events']
    // }),

    // deleteEvent: builder.mutation({
    //   query: (EventId) => ({
    //     url: `events/delete/${EventId}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['events']
    // })
  })
});

export const {
  useGetRoomsQuery,
//   useGetSingleEventsQuery,
//   useAddEventMutation,
//   useUpdateEventMutation
} = roomApi;
