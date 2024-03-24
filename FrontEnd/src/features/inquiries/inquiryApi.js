import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inquiryApi = createApi({
  reducerPath: "inquiryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Inquiries"],
  endpoints: (builder) => ({
    getInquiries: builder.query({
      query: () => "inquiries",
      providesTags: ["Inquiries"],
    }),

    getSingleInquiry: builder.query({
      query: (id) => `inquiries/find/${id}`,
      providesTags: ["Inquiries"],
    }),
    getInquiryByEmail: builder.query({
      query: (email) => `${email}/find/inquiries`,
      providesTags: ["Inquiries"],
    }),

    addInquiry: builder.mutation({
      query: (inquiry) => ({
        url: "inquiry",
        method: "POST",
        body: inquiry,
      }),
      invalidatesTags: ["Inquiries"],
    }),

    updateInquiry: builder.mutation({
      query: (inquiry) => ({
        url: `inquiry/update/${inquiry.InquiryId}`,
        method: "PUT",
        body: inquiry,
      }),
      invalidatesTags: ["Inquiries"],
    }),

    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/inquiry/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiries"],
    }),
  }),
});

export const {
  useGetInquiriesQuery,
  useGetSingleInquiryQuery,
  useGetInquiryByEmailQuery,
  useAddInquiryMutation,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} = inquiryApi;
