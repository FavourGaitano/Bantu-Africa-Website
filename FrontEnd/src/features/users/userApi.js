import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi=createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000/api/'}),
    tagTypes: ['Users'],
    endpoints: (builder)=>({
        
        getUsers:builder.query({
            query:()=> 'users',
            providesTags: ['Users']
        }),


        addUser:builder.mutation({
            query:(user)=>({
                url: 'users',
                method:'POST',
                body: user
            }),
            invalidatesTags:['Users']
        }),

        authenticateUser:builder.mutation({
            query:(user)=>({
                url: 'users/login',
                method:'POST',
                body: user
            }),
     
            invalidatesTags:['Users']
        }),

   
     
    })
       
})


export const {useGetUsersQuery,useAddUserMutation,useAuthenticateUserMutation}=userApi