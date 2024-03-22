import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inquiryApi = createApi({
  reducerPath: "inquiryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["inquiries"],
  endpoints: (builder) => ({
    getInqueries: builder.query({
      query: () => "inquiries",
      providesTags: ["inquiries"],
    }),

    getSingleInquery: builder.query({
      query: (id) => `inquiries/find/${id}`,
      providesTags: ["inquiries"],
    }),
    getInqueryByEmail: builder.query({
      query: (email) => `/${email}/inquiries/find`,
      providesTags: ["inquiries"],
    }),

    addInquery: builder.mutation({
      query: (inquery) => ({
        url: "inquiries",
        method: "POST",
        body: inquery,
      }),
      invalidatesTags: ["inquiries"],
    }),

    updateInquery: builder.mutation({
      query: (inquery) => ({
        url: `inquiry/update/${inquery.id}`,
        method: "PUT",
        body: inquery,
      }),
      invalidatesTags: ["inquiries"],
    }),

    deleteInquery: builder.mutation({
      query: (id) => ({
        url: `/inquiry/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["inquiries"],
    }),
  }),
});

export const {
  useGetInqueriesQuery,
  useGetSingleInqueryQuery,
  useAddInqueryMutation,
  useUpdateInqueryMutation,
  useDeleteInqueryMutation,
} = inqueryApi;
