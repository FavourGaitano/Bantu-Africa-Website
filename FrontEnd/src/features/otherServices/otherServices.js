import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otherServiceApi = createApi({
    reducerPath: "otherServiceApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
    tagTypes: ["OtherServices"],
    endpoints: (builder) => ({
        getOtherServices: builder.query({
            query: () => "otherService",
            providesTags: ["OtherServices"],
        }),

        createOtherService: builder.mutation({
            query: (newOtherService) => ({
                url: "otherService",
                method: "POST",
                body: newOtherService
            }),
            invalidatesTags: ["OtherServices"]
        }),

        updateOtherService: builder.mutation({
            query: ({ OtherServiceId, ...updateOtherService }) => ({
                url: `otherService/${OtherServiceId}`,
                method: "PUT",
                body: updateOtherService
            }),
            invalidatesTags: ["OtherServices"]
        }),

        deleteService: builder.mutation({
            query: (OtherServiceId) => ({
              url: `otherService/${OtherServiceId}`,
              method: "DELETE",
            }),
            invalidatesTags: ["OtherServices"],
        }),

    })
});

export const { useGetOtherServicesQuery } = otherServiceApi;
