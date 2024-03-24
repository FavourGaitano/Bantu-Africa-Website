import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const meetingsApi = createApi({
  reducerPath: "meetingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Meetings"],
  endpoints: (builder) => ({
    getMeetings: builder.query({
      query: () => "meeting",
      providesTags: ["Meetings"],
    }),

    getSingleMeeting: builder.query({
      query: (id) => `meeting/${id}`,
      providesTags: ["Meetings"],
    }),

    addMeeting: builder.mutation({
      query: (meeting) => ({
        url: "meeting",
        method: "POST",
        body: meeting,
      }),
      invalidatesTags: ["Meetings"],
    }),

    updateMeeting: builder.mutation({
      query: (Meeting) => ({
        url: `meeting/${Meeting.MeetingId}`,
        method: "PUT",
        body: Meeting,
      }),
      invalidatesTags: ["Meetings"],
    }),

    deleteMeeting: builder.mutation({
      query: (id) => ({
        url: `/Meeting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meetings"],
    }),
  }),
});

export const {
  useGetMeetingsQuery,
  useGetSingleMeetingQuery,
  useGetMeetingByEmailQuery,
  useAddMeetingMutation,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
} = meetingsApi;
