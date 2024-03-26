import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingsApi = createApi({
  reducerPath: "bookingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => "bookings",
      providesTags: ["Bookings"],
    }),
    getBookingById: builder.query({
      query: (BookingId) => `bookings/${BookingId}`,
      providesTags: ["Bookings"],
    }),
    getBookingsByEmail: builder.query({
      query: (Email) => `${Email}/bookings`,
      providesTags: ["Bookings"],
    }),
    getBookingsByName: builder.query({
      query: (firstname, lastname) => `${firstname}/${lastname}/`,
      providesTags: ["Bookings"],
    }),
    getBookingsByRoomId: builder.query({
      query: (RoomId) => `booking/room/${RoomId}`,
      providesTags: ["Bookings"],
    }),
    getPriceOfBooking: builder.mutation({
      query: (Booking) => ({
        url: "category/rooms/category/price",
        method: "POST",
        body: Booking,
      }),
      invalidatesTags: ["Bookings"],
    }),
    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: "new/booking",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation({
      query: (updatedBooking, BookingId) => ({
        url: `booking/update/${BookingId}`,
        method: "PUT",
        body: updatedBooking,
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (BookingId) => ({
        url: `booking/delete/${BookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useGetBookingsByEmailQuery,
  useGetBookingsByNameQuery,
  useGetBookingsByRoomIdQuery,
  useGetPriceOfBookingMutation,
} = bookingsApi;
