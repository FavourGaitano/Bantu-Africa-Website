
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['notifications'],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => 'notifications',
      providesTags: ['notifications']
    }),
    getBookingNotifications: builder.query({
        query: (BookingId) => `notifications/bookings/${BookingId}`,
        providesTags: ['notifications']
      }),
    updateNotification: builder.mutation({
      query: (notification) => ({
        url: `notifications/update/${notification.BookingId}`,
        method: 'PUT',
        body: notification
      }),
      invalidatesTags: ['notifications']
    }),

    deleteNotification: builder.mutation({
      query: (NotificationId,BookingId) => ({
        url: `/notifications/delete/${NotificationId}/${BookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notifications']
    })
  })
});

export const {
  useGetNotificationsQuery,
  useGetBookingNotificationsQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation
} = notificationApi;
