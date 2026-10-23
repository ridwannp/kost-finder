import { baseApi } from '../api/baseApi'

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useGetPostsQuery, useCreatePostMutation } = postsApi
