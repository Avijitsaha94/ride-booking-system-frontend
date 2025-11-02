/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useGetRideDetailsQuery } from './rideApi';

// RTK error message getter
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    
    return (error as any).data?.message ?? "Could not load ride details";
  }
  return "Could not load ride details";
}

export default function RideDetails() {
  const { id } = useParams();
  // Default blank string if id missing
  const { data, isLoading, error } = useGetRideDetailsQuery(id ?? '');

  if (isLoading) return <div>Loading ride details...</div>;
  if (error) return <div className="text-red-600">{getErrorMessage(error)}</div>;

  const ride = data?.data;
  if (!ride) return null;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Ride Details</h2>
      <div>Pickup: {ride.pickupLocation ?? '-'}</div>
      <div>Drop-off: {ride.dropoffLocation ?? '-'}</div>
      <div>Driver: {ride.driver?.name ?? '-'}</div>
      <div>Status: {ride.status ?? '-'}</div>
      <div>Fare: {ride.fare ?? '-'}</div>
      <div>Requested: {ride.createdAt ?? '-'}</div>
    </div>
  );
}
