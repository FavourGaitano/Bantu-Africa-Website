
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const offerApi = createApi({
  reducerPath: "inquireApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['offers'],
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => 'offer',
      providesTags: ['offer']
    }),

    getSingleOffer: builder.query({
      query: (OfferId) => `offer/single/${OfferId}`,
      providesTags: ['offer']
    }),
  
    addOffer: builder.mutation({
      query: (offer) => ({
        url: 'offer',
        method: 'POST',
        body: offer
      }),
      invalidatesTags: ['offer']
    }),

    updateOffer: builder.mutation({
      query: (offer) => ({
        url: `offer/update/${offer.OfferId}`,
        method: 'PUT',
        body: offer
      }),
      invalidatesTags: ['offer']
    }),

    deleteOffer: builder.mutation({
      query: (OfferId) => ({
        url: `offer/delete/${OfferId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['offer']
    })
  })
});

export const {
  useGetOffersQuery,
  useGetSingleOfferQuery,
  useAddOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation
} = offerApi;
