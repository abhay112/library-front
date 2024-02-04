/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllAttendanceResponse, MessageResponse, UpdateAttendanceRequest,GetAttendanceRequest } from "../../types/api-types";

export const attendanceAPI = createApi({
    reducerPath: "attendanceAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/attendance/`,
    }),
    tagTypes: ["attendance"],
    endpoints: (builder) => ({
        updateAttendance: builder.mutation<MessageResponse, UpdateAttendanceRequest>({
            query: ({ studentId, adminId }) => ({
                url: `attendanceApprove/${studentId}?id=${adminId}`,
                method: "PUT",
            }),
            invalidatesTags: ["attendance"],
        }),
        getAttendance: builder.query<AllAttendanceResponse, string>({
            query: (adminId) => ({
                url: `getAllStudentTodayAttendace?id=${adminId}`,
                method: "GET",
            }),
        }),
        getSingleStudentAllAttendace: builder.query<MessageResponse, GetAttendanceRequest>({
            query: ({studentId,adminId}) => ({
                url: `/${studentId}?id=${adminId}`,
                method: "GET",
            }),
        }),
    })

})


export const { useGetAttendanceQuery, useUpdateAttendanceMutation,useGetSingleStudentAllAttendaceQuery } = attendanceAPI;