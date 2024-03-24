import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["gallery"],
  endpoints: (builder) => ({
    getPictures: builder.query({
      query: () => "gallery",
      providesTags: ["gallery"],
    }),

    getPicture: builder.query({
      query: (id) => `gallery/find/${id}`,
      providesTags: ["gallery"],
    }),

    getPictureByCategory: builder.query({
      query: (category) => `gallery/category/${category}`,
      providesTags: ["gallery"],
    }),

    addPicture: builder.mutation({
      query: (picture) => ({
        url: "gallery",
        method: "POST",
        body: picture,
      }),
      invalidatesTags: ["gallery"],
    }),

    updatePicture: builder.mutation({
      query: (picture) => ({
        url: `gallery/${picture.id}`,
        method: "PUT",
        body: picture,
      }),
      invalidatesTags: ["gallery"],
    }),

    deletePicture: builder.mutation({
      query: (id) => ({
        url: `/gallery//${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetPicturesQuery,
  useGetSinglepictureQuery,
  useAddpictureMutation,
  useUpdatepictureMutation,
  useDeletepictureMutation,
  useGetPictureByCategoryQuery,
} = galleryApi;
