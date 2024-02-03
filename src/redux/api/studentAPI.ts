import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllStudentsResponse,
  StudentResponse,
  MessageResponse,
  DeleteStudentRequest,
  UpdateStudentRequest
} from "../../types/api-types";

export const studentAPI = createApi({
  reducerPath: "studentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/student/`,
  }),
  tagTypes: ["student"],
  endpoints: (builder) => ({
    allStudents: builder.query<AllStudentsResponse, string>({
      query: (id) => `latest?id=${id}`,
      providesTags: ["student"],
    }),
    studentDetails: builder.query<StudentResponse, string>({
      query: (id) => id,
      providesTags: ["student"],
    }),
    deleteStudent: builder.mutation<MessageResponse, DeleteStudentRequest>({
      query: ({ userId, studentId }) => ({
        url: `${studentId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
    updateStudent: builder.mutation<MessageResponse, UpdateStudentRequest>({
      query: ({ formData, userId, studentId }) => ({
        url: `${studentId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["student"],
    }),

  }),
});

export const {
  useAllStudentsQuery,
  useStudentDetailsQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentAPI;



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//   AllStudentsResponse,
//   DeleteStudentRequest,
//   MessageResponse,
//   NewStudentRequest,
//   SearchStudentsRequest,
//   SearchStudentsResponse,
//   StudentResponse,
//   UpdateStudentRequest,
// } from "../../types/api-types";

// export const studentApi = createApi({
//   reducerPath: "studentApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/student/`,
//   }),
//   tagTypes: ["student"],
//   endpoints: (builder) => ({
//     latestStudents: builder.query<AllStudentsResponse, string>({
//       query: () => "latest",
//       providesTags: ["student"],
//     }),
//     allStudents: builder.query<AllStudentsResponse, string>({
//       query: (id) => `latest?id=${id}`,
//       providesTags: ["student"],
//     }),

//     searchStudents: builder.query<SearchStudentsResponse, SearchStudentsRequest>({
//       query: ({ price, search, sort, category, page }) => {
//         let base = `all?search=${search}&page=${page}`;

//         if (price) base += `&price=${price}`;
//         if (sort) base += `&sort=${sort}`;
//         if (category) base += `&category=${category}`;

//         return base;
//       },
//       providesTags: ["student"],
//     }),

//     studentDetails: builder.query<StudentResponse, string>({
//       query: (id) => id,
//       providesTags: ["student"],
//     }),

//     newStudent: builder.mutation<MessageResponse, NewStudentRequest>({
//       query: ({ formData, id }) => ({
//         url: `new?id=${id}`,
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["student"],
//     }),

//     updateStudent: builder.mutation<MessageResponse, UpdateStudentRequest>({
//       query: ({ formData, userId, studentId }) => ({
//         url: `${studentId}?id=${userId}`,
//         method: "PUT",
//         body: formData,
//       }),
//       invalidatesTags: ["student"],
//     }),

//     deleteStudent: builder.mutation<MessageResponse, DeleteStudentRequest>({
//       query: ({ userId, studentId }) => ({
//         url: `${studentId}?id=${userId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["student"],
//     }),
//   }),
// });

// export const {
//   useLatestStudentsQuery,
//   useAllStudentsQuery,
//   useSearchStudentsQuery,
//   useNewStudentMutation,
//   useStudentDetailsQuery,
//   useUpdateStudentMutation,
//   useDeleteStudentMutation,
// } = studentApi;
