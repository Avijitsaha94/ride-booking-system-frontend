import { baseApi } from '../../api/baseApi';

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriver: builder.query({
      query: (id: string) => ({
        url: `/drivers/${id}`,
        method: 'GET',
      }),
    }),
    updateDriver: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/drivers/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    setAvailability: builder.mutation({
      query: ({ id, online }: {id: string, online: boolean}) => ({
        url: `/drivers/${id}`,
        method: 'PATCH',
        body: { online },
      }),
    }),
    getIncomingRequests: builder.query({
      query: ({ id }) => ({
        url: `/drivers/${id}/incoming`,
        method: 'GET',
      }),
    }),
    acceptRide: builder.mutation({
      query: ({ rideId }) => ({
        url: `/rides/${rideId}/accept`,
        method: 'PATCH',
      }),
    }),
    updateRideStatus: builder.mutation({
      query: ({ rideId, status }) => ({
        url: `/rides/${rideId}/status`,
        method: 'PATCH',
        body: { status },
      }),
    }),
    getEarnings: builder.query({
      query: ({ id, period }) => ({
        url: `/drivers/${id}/earnings?period=${period}`,
        method: 'GET',
      }),
    }),
    getRideHistory: builder.query({
      query: ({ id, params }) => ({
        url: `/drivers/${id}/rides`,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useGetDriverQuery,
  useUpdateDriverMutation,
  useSetAvailabilityMutation,
  useGetIncomingRequestsQuery,
  useAcceptRideMutation,
  useUpdateRideStatusMutation,
  useGetEarningsQuery,
  useGetRideHistoryQuery,
} = driverApi;
