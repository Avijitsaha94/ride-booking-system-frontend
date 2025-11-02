import { baseApi } from '../../api/baseApi';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/users/all-users',
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    getAllRides: builder.query({
      query: (params) => ({
        url: '/rides',
        method: 'GET',
        params,
      }),
    }),
    getRideDetails: builder.query({
      query: (id: string) => ({
        url: `/rides/${id}`,
        method: 'GET',
      }),
    }),
    analytics: builder.query({
      query: () => ({
        url: '/admin/analytics',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetAllRidesQuery,
  useGetRideDetailsQuery,
  useAnalyticsQuery,
} = adminApi;
