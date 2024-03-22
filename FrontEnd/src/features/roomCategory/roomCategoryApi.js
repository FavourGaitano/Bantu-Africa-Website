
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomCategoryApi = createApi({
  reducerPath: "roomCategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['roomCategories'],
  endpoints: (builder) => ({
    getRoomCategories: builder.query({
      query: () => 'category/rooms/category',
      providesTags: ['roomCategories']
    }),

    getSingleRoomCategory: builder.query({
      query: (roomCategory) => `category/rooms/category/${roomCategory}`,
      providesTags: ['roomCategories']
    }),

    addRoomCategory: builder.mutation({
      query: (roomCategory) => ({
        url: 'category/rooms/category',
        method: 'POST',
        body: roomCategory
      }),
      invalidatesTags: ['roomCategories']
    }),

    updateRoomCategory: builder.mutation({
      query: (roomCategory) => ({
        url: `category/rooms/category/update/${roomCategory.RoomCategoryId}`,
        method: 'PUT',
        body: roomCategory
      }),
      invalidatesTags: ['roomCategories']
    }),

    deleteRoomCategory: builder.mutation({
      query: (RoomCategoryId) => ({
        url: `category/rooms/category/${RoomCategoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['roomCategories']
    })
  })
});

export const {
  useGetRoomCategoriesQuery,
  useGetSingleRoomCategoryQuery,
  useAddRoomCategoryMutation,
  useUpdateRoomCategoryMutation,
  useDeleteRoomCategoryMutation
} = roomCategoryApi;
