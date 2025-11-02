import { baseApi } from '../../api/baseApi';

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (body) => ({
        url: '/rides/request',
        method: 'POST',
        body,
      }),
    }),
    getRideHistory: builder.query({
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
  }),
});

export const {
  useRequestRideMutation,
  useGetRideHistoryQuery,
  useGetRideDetailsQuery,
} = rideApi;
