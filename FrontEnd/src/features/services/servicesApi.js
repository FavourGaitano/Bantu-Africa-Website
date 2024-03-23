import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "service",
      providesTags: ["Services"],
    }),
    getOneService: builder.query({
      query: (ServiceId) => `service/${ServiceId}`,
      providesTags: ["Services"],
    }),
    createService: builder.mutation({
      query: (newService) => ({
        url: "service",
        method: POST,
        body: newService,
      }),
      invalidatesTags: ["Services"],
    }),
    updateService: builder.mutation({
      query: (updatedService) => ({
        url: `service/${updatedService.ServiceId}`,
        method: PUT,
        body: updatedService,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation({
      query: (ServiceId) => ({
        url: `service/${ServiceId}`,
        method: DELETE,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetOneServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
