
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
    getRoomsByName: builder.query({
      query: (room) => `/rooms/all/category/${room.Name}`,
      providesTags: ['rooms']
    }),
    getSingleRoom: builder.query({
      query: (RoomId) => `rooms/${RoomId}`,
      providesTags: ['rooms']
    }),
    addRoom: builder.mutation({
      query: (room) => ({
        url: 'rooms',
        method: 'POST',
        body: room
      }),
      invalidatesTags: ['rooms']
    }),

    updateRoom: builder.mutation({
      query: (room) => ({
        url: `rooms/update/${room.RoomId}`,
        method: 'PUT',
        body: room
      }),
      invalidatesTags: ['rooms']
    }),

    deleteRoom: builder.mutation({
      query: (RoomId) => ({
        url: `rooms/delete/${RoomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['rooms']
    })
  })
});

export const {
  useGetRoomsQuery,
  useGetRoomsByNameQuery,
  useGetSingleRoomQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation
} = roomApi;
