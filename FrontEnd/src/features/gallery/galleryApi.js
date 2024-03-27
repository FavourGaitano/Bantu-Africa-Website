import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const galleryApi = createApi({
  reducerPath: 'galleryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['Gallery'],
  endpoints: (builder) => ({
    getPictures: builder.query({
      query: () => 'gallery',
      providesTags: ['Gallery'],
    }),

    getPicture: builder.query({
      query: (PictureId) => `gallery/onePicture/${PictureId}`, // Corrected to match the API path
      providesTags: ['Gallery'],
    }),

    getPictureByCategory: builder.query({
      query: (category) => `gallery/category/${category}`,
      providesTags: ['Gallery'],
    }),

    addPicture: builder.mutation({
      query: (picture) => ({
        url: 'gallery',
        method: 'POST',
        body: picture,
      }),
      invalidatesTags: ['Gallery'],
    }),

    updatePicture: builder.mutation({
      query: ({ PictureId, ...picture }) => ({
        url: `gallery/${PictureId}`, // Use the rest of the picture object as the body
        method: 'PUT',
        body: picture,
      }),
      invalidatesTags: ['Gallery'],
    }),

    deletePicture: builder.mutation({
      query: (PictureId) => ({
        url: `gallery/${PictureId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),
  }),
});

export const {
  useGetPicturesQuery,
  useGetPictureQuery,
  useGetPictureByCategoryQuery,
  useAddPictureMutation, 
  useUpdatePictureMutation, 
  useDeletePictureMutation, 
} = galleryApi;
