
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['restaurant'],
  endpoints: (builder) => ({

    getRestaurantMenu: builder.query({
      query: () => 'restaurant/menu',
      providesTags: ['restaurant']
    }),

    // getSingleRoom: builder.query({
    //   query: (RoomId) => `rooms/${RoomId}`,
    //   providesTags: ['rooms']
    // }),

    // addRoom: builder.mutation({
    //   query: (room) => ({
    //     url: 'rooms',
    //     method: 'POST',
    //     body: room
    //   }),
    //   invalidatesTags: ['rooms']
    // }),

    // updateRoom: builder.mutation({
    //   query: (room) => ({
    //     url: `rooms/update/${room.RoomId}`,
    //     method: 'PUT',
    //     body: room
    //   }),
    //   invalidatesTags: ['rooms']
    // }),

    // deleteRoom: builder.mutation({
    //   query: (RoomId) => ({
    //     url: `rooms/delete/${RoomId}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['rooms']
    // })
  })
});

export const {
  useGetRestaurantMenuQuery,
  
} = restaurantApi;
