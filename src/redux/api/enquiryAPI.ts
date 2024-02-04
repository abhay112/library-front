/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  MessageResponse,  AllEnquiryResponse, NewEnquiryRequest } from "../../types/api-types";
import { Enquiry } from "../../types/types";

export const enquiryAPI = createApi({
    reducerPath: "enquiryAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/enquiry/`,
    }),
    tagTypes: ["enquiry"],
    endpoints: (builder) => ({
        createEnquiry: builder.mutation<MessageResponse, NewEnquiryRequest>({
            query: ({ formData, id }) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["enquiry"],
        }),
        getEnquiry: builder.query<AllEnquiryResponse, string>({
            query: (adminId) => ({
                url: `all?id=${adminId}`,
                method: "GET",
            }),
        }),
    })

})


export const { useCreateEnquiryMutation, useGetEnquiryQuery } = enquiryAPI;