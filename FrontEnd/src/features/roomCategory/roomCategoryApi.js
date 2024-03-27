
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
    getCategoriesByName: builder.query({
      query: (name) => `category/rooms/category/name/${name}`,
      providesTags: ['roomCategories']
    }),
    
    getCategoriesByNameSizeAndMealPlan: builder.query({
      query: ({ name, size, mealPlan }) => ({
        url: 'category/rooms/category/mealplan',
        method: 'POST',
        body: { name, size, mealPlan }
      }),
      providesTags: ['roomCategories']
    }),
    
    getPriceByNameSizeAndMealPlan: builder.query({
      query: ({ name, size, mealPlan }) => ({
        url: 'category/rooms/category/name/price',
        method: 'POST',
        body: { name, size, mealPlan }
      })
    }),
    
    getCategoriesByNameAndSize: builder.query({
      query: ({ name, size }) => ({
        url: 'category/rooms/category/size',
        method: 'POST',
        body: { name, size }
      }),
      providesTags: ['roomCategories']
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
  useDeleteRoomCategoryMutation,
  useGetCategoriesByNameQuery,
  useGetCategoriesByNameSizeAndMealPlanQuery,
  useGetPriceByNameSizeAndMealPlanQuery,
  useGetCategoriesByNameAndSizeQuery
} = roomCategoryApi;



